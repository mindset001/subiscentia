const summary = [
  { label: 'Subtotal', value: 200.20 },
  { label: 'Shipping', value: 200.20 },
  { label: 'Tax', value: 200.20 },
];

const OrderSummary = () => (
  <section className="bg-white w-full bg-white shadow-sm border border-gray-200">
    <div className="bg-purple-100 py-6 rounded-t-lg">
      <h2 className="text-2xl font-light tracking-[0.2em] text-center text-purple-900 uppercase">Order Summary</h2>
    </div>
    <div className="px-16 py-6">
      <ul className="space-y-4">
        {summary.map((item, idx) => (
          <li key={item.label} className="flex items-center justify-between text-[#000] text-base">
            <span className="tracking-[0.15em] font-light uppercase">{item.label}</span>
            <span className="font-medium">${item.value.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <hr className="my-6 " />
      <div className="flex items-center justify-between text-[#000] text-lg font-semibold">
        <span className="tracking-[0.15em] font-light uppercase">Total</span>
        <span>${summary[summary.length - 1].value.toFixed(2)}</span>
      </div>
    </div>
  </section>
);

export default OrderSummary;
