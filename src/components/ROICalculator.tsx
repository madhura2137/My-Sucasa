
'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

const formatPercentage = (value: number) => {
  return `${(value * 100).toFixed(2)}%`;
};

export function ROICalculator() {
  const [purchasePrice, setPurchasePrice] = useState(5000000);
  const [downPayment, setDownPayment] = useState(20);
  const [closingCosts, setClosingCosts] = useState(3);
  const [monthlyRent, setMonthlyRent] = useState(20000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(5000);
  const [appreciation, setAppreciation] = useState(4);

  const calculations = useMemo(() => {
    const downPaymentAmount = purchasePrice * (downPayment / 100);
    const closingCostsAmount = purchasePrice * (closingCosts / 100);
    const totalInvestment = downPaymentAmount + closingCostsAmount;

    const annualRent = monthlyRent * 12;
    const annualExpenses = monthlyExpenses * 12;
    const netOperatingIncome = annualRent - annualExpenses;

    const loanAmount = purchasePrice - downPaymentAmount;
    const annualMortgagePayment = loanAmount * 0.08; // Simplified 8% annual mortgage cost
    const annualCashFlow = netOperatingIncome - annualMortgagePayment;

    const cashOnCashROI = totalInvestment > 0 ? annualCashFlow / totalInvestment : 0;
    const capRate = purchasePrice > 0 ? netOperatingIncome / purchasePrice : 0;
    
    const appreciationValue = purchasePrice * (appreciation / 100);
    const totalAnnualReturn = annualCashFlow + appreciationValue;
    const totalROI = totalInvestment > 0 ? totalAnnualReturn / totalInvestment : 0;

    return {
      totalInvestment,
      annualCashFlow,
      netOperatingIncome,
      cashOnCashROI,
      capRate,
      totalAnnualReturn,
      totalROI,
      appreciationValue,
    };
  }, [purchasePrice, downPayment, closingCosts, monthlyRent, monthlyExpenses, appreciation]);

  const pieData = [
    { name: 'Cash Flow', value: Math.max(0, calculations.annualCashFlow) },
    { name: 'Appreciation', value: Math.max(0, calculations.appreciationValue) },
  ];
  
  const COLORS = ['#16a34a', '#f97316'];

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Real Estate ROI Calculator</CardTitle>
        <CardDescription>Analyze the potential return on your next investment property.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Property & Loan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="purchase-price">Purchase Price</Label>
                        <Input id="purchase-price" type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(Number(e.target.value))} />
                    </div>
                     <div>
                        <Label>Down Payment: {downPayment}%</Label>
                        <Slider defaultValue={[downPayment]} max={100} step={1} onValueChange={(val) => setDownPayment(val[0])} />
                    </div>
                     <div>
                        <Label>Closing Costs: {closingCosts}%</Label>
                        <Slider defaultValue={[closingCosts]} max={10} step={0.5} onValueChange={(val) => setClosingCosts(val[0])} />
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Income & Expenses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="monthly-rent">Monthly Rent</Label>
                        <Input id="monthly-rent" type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(Number(e.target.value))} />
                    </div>
                    <div>
                        <Label htmlFor="monthly-expenses">Monthly Expenses (Taxes, Insurance, etc.)</Label>
                        <Input id="monthly-expenses" type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value))} />
                    </div>
                    <div>
                        <Label>Annual Appreciation: {appreciation}%</Label>
                        <Slider defaultValue={[appreciation]} max={20} step={0.5} onValueChange={(val) => setAppreciation(val[0])} />
                    </div>
                </CardContent>
            </Card>
          </div>

          {/* Outputs */}
          <div className="space-y-6">
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">Investment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between"><span>Total Investment:</span> <span className="font-semibold">{formatCurrency(calculations.totalInvestment)}</span></div>
                <div className="flex justify-between"><span>Annual Cash Flow:</span> <span className="font-semibold">{formatCurrency(calculations.annualCashFlow)}</span></div>
                <div className="flex justify-between"><span>Net Operating Income (NOI):</span> <span className="font-semibold">{formatCurrency(calculations.netOperatingIncome)}</span></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Return Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                 <div className="flex justify-between items-center"><span className="text-base font-bold text-primary">Total Annual Return:</span> <span className="text-base font-bold text-primary">{formatCurrency(calculations.totalAnnualReturn)}</span></div>
                <div className="flex justify-between"><span>Cash on Cash ROI:</span> <span className="font-semibold">{formatPercentage(calculations.cashOnCashROI)}</span></div>
                <div className="flex justify-between"><span>Total ROI (with Appreciation):</span> <span className="font-semibold">{formatPercentage(calculations.totalROI)}</span></div>
                <div className="flex justify-between"><span>Capitalization (Cap) Rate:</span> <span className="font-semibold">{formatPercentage(calculations.capRate)}</span></div>
              </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Annual Return Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full h-[200px]">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
