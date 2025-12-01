'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function ClientModal({ defaults = {}, onClose }: { defaults?: any, onClose: () => void }) {
    const router = useRouter()
    const [form, setForm] = useState({
        id: defaults.id,
        family: defaults.family ?? '',
        name: defaults.name ?? '',
        secname: defaults.secname ?? '',
        notes: defaults.notes ?? '',
    })
    const [loading, setLoading] = useState(false)

    async function submit() {
        setLoading(true)
        try {
            if (form.id) {
                await axios.put(`/api/tables/clients/${form.id}`, form)
            } else {
                await axios.post('/api/tables/clients', form)
            }
            router.refresh()
            onClose()
        } catch (e) {
            console.error(e)
            alert('Ошибка')
        } finally { setLoading(false) }
    }

    return (
        <div className="fixed inset-0 grid place-items-center bg-black/40 z-50">
            <div className="bg-white rounded p-4 w-96">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold">{form.id ? 'Редактировать клиента' : 'Добавить клиента'}</h3>
                    <button className="btn btn-ghost" onClick={onClose}>✕</button>
                </div>
                <div className="space-y-2">
                    <input className="input w-full" value={form.family} placeholder="Фамилия" onChange={(e) => setForm({ ...form, family: e.target.value })} />
                    <input className="input w-full" value={form.name} placeholder="Имя" onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <input className="input w-full" value={form.secname} placeholder="Отчество" onChange={(e) => setForm({ ...form, secname: e.target.value })} />
                    <textarea className="input w-full" value={form.notes} placeholder="Примечания" onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                </div>
                <div className="flex gap-2 justify-end mt-3">
                    <button className="btn btn-ghost" onClick={onClose}>Отмена</button>
                    <button className="btn" onClick={submit} disabled={loading}>{loading ? 'Сохраняем...' : 'Сохранить'}</button>
                </div>
            </div>
        </div>
    )
}
