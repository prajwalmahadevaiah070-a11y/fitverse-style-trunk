'use client'

import {
  Banknote,
  Briefcase,
  IndianRupee,
  ShoppingBag,
  TrendingUp,
} from 'lucide-react'

import { ProductForm } from '@/components/admin/ProductForm'
import { useAdminMetrics, useFitVerse } from '@/lib/fitverse-store'
import {
  formatINR,
  ORDER_STATUSES,
  PLATFORM_COMMISSION,
  type OrderStatus,
} from '@/lib/fitverse-types'
import { cn } from '@/lib/utils'

const STATUS_STYLES: Record<OrderStatus, string> = {
  Pending: 'text-amber-300',
  Dispatched: 'text-sky-300',
  'Trial Active': 'text-gold',
  Kept: 'text-success',
  Returned: 'text-muted-foreground',
}

export function AdminDashboard() {
  const { orders, updateOrderStatus } = useFitVerse()
  const metrics = useAdminMetrics()

  return (
    <main className="px-4 pt-6">
      <header className="mb-5">
        <p className="eyebrow">FitVerse Operations</p>
        <h1 className="text-2xl">Admin dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Live trial orders, revenue and boutique settlements.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-3">
        <Metric
          icon={ShoppingBag}
          label="Total orders"
          value={String(metrics.totalOrders)}
        />
        <Metric
          icon={Briefcase}
          label="Active trials"
          value={String(metrics.activeTrials)}
        />
        <Metric
          icon={IndianRupee}
          label="Total revenue"
          value={formatINR(metrics.totalRevenue)}
        />
        <Metric
          icon={TrendingUp}
          label="Platform commission (15%)"
          value={formatINR(metrics.commission)}
          highlight
        />
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-lg">Live orders</h2>
        {orders.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No orders yet. New trial bookings will appear here in real time.
          </p>
        ) : (
          <div className="space-y-3">
            {orders.map((o) => (
              <div
                key={o.id}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{o.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {o.phone} · {o.pincode}
                    </p>
                  </div>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-[0.65rem] text-muted-foreground">
                    {o.id}
                  </span>
                </div>

                <p className="mt-2 text-xs text-muted-foreground">{o.address}</p>
                <p className="mt-1 text-xs">
                  <span className="text-muted-foreground">Slot:</span> {o.slot}
                </p>

                <ul className="mt-2 space-y-1">
                  {o.items.map((it) => (
                    <li
                      key={it.productId}
                      className="flex justify-between text-xs"
                    >
                      <span className="text-muted-foreground">
                        {it.name} · {it.brand} · {it.size}
                      </span>
                      <span>{formatINR(it.price)}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
                  <div className="text-xs">
                    <p className="text-muted-foreground">
                      UTR: <span className="text-foreground">{o.utr}</span>
                    </p>
                    <p className="text-muted-foreground">
                      Deposit {formatINR(o.deposit)} · Garment{' '}
                      {formatINR(o.garmentValue)}
                    </p>
                  </div>
                  <label className="inline-flex items-center gap-2 text-xs">
                    <span className="sr-only">Order status</span>
                    <select
                      value={o.status}
                      onChange={(e) =>
                        updateOrderStatus(o.id, e.target.value as OrderStatus)
                      }
                      className={cn(
                        'rounded-lg border border-input bg-surface-raised px-2 py-1.5 text-xs font-medium outline-none focus:border-primary/50',
                        STATUS_STYLES[o.status],
                      )}
                    >
                      {ORDER_STATUSES.map((s) => (
                        <option key={s} value={s} className="bg-surface-raised text-foreground">
                          {s}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-8">
        <h2 className="mb-1 text-lg">Settlement ledger</h2>
        <p className="mb-3 text-xs text-muted-foreground">
          Boutique partners receive {Math.round((1 - PLATFORM_COMMISSION) * 100)}%
          of garment value; FitVerse retains{' '}
          {Math.round(PLATFORM_COMMISSION * 100)}%.
        </p>
        {metrics.ledger.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            Settlements populate once orders come in.
          </p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-raised text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 font-medium">Boutique</th>
                  <th className="px-2 py-2 text-right font-medium">Pcs</th>
                  <th className="px-2 py-2 text-right font-medium">Gross</th>
                  <th className="px-2 py-2 text-right font-medium">Comm.</th>
                  <th className="px-3 py-2 text-right font-medium">Payout</th>
                </tr>
              </thead>
              <tbody>
                {metrics.ledger.map((row) => (
                  <tr key={row.brand} className="border-t border-border">
                    <td className="px-3 py-2">{row.brand}</td>
                    <td className="px-2 py-2 text-right">{row.pieces}</td>
                    <td className="px-2 py-2 text-right">{formatINR(row.gross)}</td>
                    <td className="px-2 py-2 text-right text-gold">
                      {formatINR(row.commission)}
                    </td>
                    <td className="px-3 py-2 text-right text-success">
                      {formatINR(row.payout)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-8 pb-4">
        <div className="mb-3 inline-flex items-center gap-2">
          <Banknote className="size-4 text-gold" />
          <h2 className="text-lg">Product onboarding</h2>
        </div>
        <ProductForm />
      </section>
    </main>
  )
}

function Metric({
  icon: Icon,
  label,
  value,
  highlight,
}: {
  icon: typeof ShoppingBag
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div
      className={cn(
        'rounded-xl border p-4',
        highlight ? 'border-gold/40 bg-gold/5' : 'border-border bg-card',
      )}
    >
      <Icon className={cn('size-4', highlight ? 'text-gold' : 'text-muted-foreground')} />
      <p className="mt-2 text-lg font-semibold">{value}</p>
      <p className="text-[0.7rem] uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
    </div>
  )
}
