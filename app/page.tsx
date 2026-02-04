import { CalculatorForm } from "@/components/calculator/CalculatorForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10 space-y-2 animate-in fade-in slide-in-from-top-4 duration-500">
        <h1 className="text-h1 tracking-tight">
          MSE Solar Estimator
        </h1>
        <p className="text-xl text-navy opacity-80 max-w-2xl mx-auto">
          Calculate your solar needs, system size, and potential savings instantly.
        </p>
      </div>

      <CalculatorForm />

      <footer className="mt-12 text-center text-sm text-grey">
        <p>&copy; {new Date().getFullYear()} Musstech Solar Estimator. All rights reserved.</p>
      </footer>
    </div>
  );
}
