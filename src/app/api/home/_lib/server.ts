import prisma from '@/lib/prisma'

function monthKey(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).toISOString()
}

export async function getDashboardData() {
    const totalClients = await prisma.clients.count()
    const negativeClients = await prisma.clients.count({ where: { balance: { lt: 0 } } })
    const positiveClients = totalClients - negativeClients

    const transactionsCount = await prisma.paymentTransactions.count()

    // ✅ Сумма по модулю всех транзакций
    const transactions = await prisma.paymentTransactions.findMany({
        select: { amount: true }
    })
    const transactionsSum = transactions.reduce((sum, tx) => sum + Math.abs(Number(tx.amount ?? 0)), 0)

    // Transactions over last 12 months
    const now = new Date()
    const months: { key: string; label: string; date: Date }[] = []
    for (let i = 11; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
        months.push({ key: monthKey(d), label: d.toLocaleString('ru-RU', { month: 'short' }), date: d })
    }

    const fromDate = new Date(months[0].date)
    fromDate.setDate(1)

    const txs = await prisma.paymentTransactions.findMany({
        where: { transactionDate: { gte: fromDate } },
        select: { amount: true, transactionDate: true },
        orderBy: { transactionDate: 'asc' },
    })

    const receivedMap: Record<string, number> = {}
    const dueMap: Record<string, number> = {}
    months.forEach((m) => { receivedMap[m.key] = 0; dueMap[m.key] = 0 })

    for (const t of txs) {
        const key = monthKey(new Date(t.transactionDate))
        const amt = Number((t.amount as any) ?? 0)
        if (amt < 0) dueMap[key] = (dueMap[key] || 0) + Math.abs(amt)
        else receivedMap[key] = (receivedMap[key] || 0) + amt
    }

    const transactionsOverTime = {
        received: months.map((m) => ({ x: m.label, y: Math.round(receivedMap[m.key] || 0) })),
        due: months.map((m) => ({ x: m.label, y: Math.round(dueMap[m.key] || 0) })),
    }

    // Balance summary (single stacked column)
    const balanceSummary = {
        sales: [{ x: 'Клиенты', y: negativeClients }],
        revenue: [{ x: 'Клиенты', y: positiveClients }],
    }

    // Tariffs usage (count phones by tariff)
    const phones = await prisma.phones.findMany({ where: { tariffId: { not: null } }, select: { tariffId: true } })
    const tariffCounts: Record<number, number> = {}
    phones.forEach((p) => { if (p.tariffId) tariffCounts[p.tariffId] = (tariffCounts[p.tariffId] || 0) + 1 })
    const tariffIds = Object.keys(tariffCounts).map((s) => Number(s))
    const tariffs = tariffIds.length ? await prisma.tariffs.findMany({ where: { id: { in: tariffIds } } }) : []
    const tariffsUsage = tariffIds.map((id) => ({ name: tariffs.find((t) => t.id === id)?.name ?? `#${id}`, amount: tariffCounts[id] }))

    // Services usage (count phoneServices by serviceId)
    const phoneServices = await prisma.phoneServices.findMany({ select: { serviceId: true } })
    const serviceCounts: Record<number, number> = {}
    phoneServices.forEach((s) => { if (s.serviceId) serviceCounts[s.serviceId] = (serviceCounts[s.serviceId] || 0) + 1 })
    const serviceIds = Object.keys(serviceCounts).map((s) => Number(s))
    const services = serviceIds.length ? await prisma.services.findMany({ where: { id: { in: serviceIds } } }) : []
    const servicesUsage = serviceIds.map((id) => ({ name: services.find((s) => s.id === id)?.name ?? `#${id}`, amount: serviceCounts[id] }))

    return {
        overview: {
            totalClients,
            transactionsCount,
            transactionsSum,
            negativeClients,
        },
        transactionsOverTime,
        balanceSummary,
        tariffsUsage,
        servicesUsage,
    }
}
