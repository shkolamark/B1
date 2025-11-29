import Link from "next/link";
import { MenuItem } from "./menu-item";
import { ChevronUp } from "./icons";
import { cn } from "@/lib/utils";
import React from "react";

export type NavMenuItem = {
  title: string;
  url?: string;
  icon?: React.ElementType;
  items?: NavMenuItem[];
};

type RecursiveMenuItemProps = {
  item: NavMenuItem;
  pathname: string;
  expandedItems: string[];
  toggleExpanded: (title: string) => void;
  level?: number;
};

export const RecursiveMenuItem: React.FC<RecursiveMenuItemProps> = ({
  item,
  pathname,
  expandedItems,
  toggleExpanded,
  level = 0,
}) => {
  const hasChildren = !!item.items && item.items.length > 0;
  const isExpanded = expandedItems.includes(item.title);

  return (
    <li key={item.title}>
      {hasChildren ? (
        <div>
          <MenuItem
            isActive={
              item.items
                ? item.items.some((child) => child.url === pathname)
                : false
            }
            onClick={() => toggleExpanded(item.title)}
            className={cn(
              "flex items-center",
              level > 0 ? `ml-${2 + 5 * level}` : ""
            )}
          >
            {item.icon && (
              <item.icon
                className="size-6 shrink-0"
                aria-hidden="true"
              />
            )}
            <span>{item.title}</span>
            <ChevronUp
              className={cn(
                "ml-auto rotate-180 transition-transform duration-200",
                isExpanded && "rotate-0"
              )}
              aria-hidden="true"
            />
          </MenuItem>
          {isExpanded && item.items && (
            <ul
              className={cn(
                "space-y-1.5 pb-[15px] pt-2",
                level > 0 ? "ml-5" : ""
              )}
              role="menu"
            >
              {item.items.map((child) => (
                <RecursiveMenuItem
                  key={child.title}
                  item={child}
                  pathname={pathname}
                  expandedItems={expandedItems}
                  toggleExpanded={toggleExpanded}
                  level={level + 1}
                />
              ))}
            </ul>
          )}
        </div>
      ) : (
        <MenuItem
          as="link"
          href={item.url ?? "/"}
          isActive={pathname === item.url}
          className={cn(
            "flex items-center gap-3 py-3",
            level > 0 ? `ml-${2 + 5 * level}` : ""
          )}
        >
          {item.icon && (
            <item.icon
              className="size-6 shrink-0"
              aria-hidden="true"
            />
          )}
          <span>{item.title}</span>
        </MenuItem>
      )}
    </li>
  );
};
