import { ChevronRightIcon, CreditCardIcon } from "lucide-react"

interface Props {
    paymentMethods: {method: string, text: string, description: string}[],
    activePaymentMethod: string,
    setActivePaymentMethod: (method: string) => void,
    setActiveTab: (tab: string) => void
}

const CheckoutPayment = ({paymentMethods, activePaymentMethod, setActivePaymentMethod, setActiveTab} : Props) => {
    return (
        <div className="bg-white rounded-xl p-5">
            <p className="flex items-center font-semibold gap-1.5 text-app-green text-lg mb-5"><CreditCardIcon className="size-4" /> Payment Method</p>
            <div className="space-y-3">
                {
                    paymentMethods.map((paymentMeth, index) => (
                        <label className={`p-4 flex items-center gap-4 rounded-xl border border-app-border cursor-pointer transition-all hover:border-app-green-lighter ${paymentMeth.method === activePaymentMethod && "bg-app-cream border-app-green"}`} onClick={() => setActivePaymentMethod(paymentMeth.method)} key={index}>
                            <input type="radio" className="size-4 text-app-green" checked={paymentMeth.method === activePaymentMethod} onChange={() => setActivePaymentMethod(paymentMeth.method)} />
                            <div>
                                <p className="text-sm font-semibold text-app-green">{paymentMeth.text}</p>
                                <p className="text-xs text-app-text-light">{paymentMeth.description}</p>
                            </div>
                        </label>
                    ))
                }
            </div>

            <button className="flex items-center gap-2 rounded-xl mt-6 px-6 py-3 font-semibold bg-app-green text-white enabled:hover:bg-app-green-light transition-colors" onClick={() => setActiveTab("Review")}>Review Order <ChevronRightIcon className="size-4" /></button>
        </div>
    )
}

export default CheckoutPayment