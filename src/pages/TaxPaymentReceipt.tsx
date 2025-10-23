import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CheckCircle, XCircle, Loader2, Download, Home } from "lucide-react";
import { format } from "date-fns";

interface PaymentDetails {
  id: string;
  order_id: string;
  payment_id: string;
  tax_type: string;
  amount: number;
  payer_name: string;
  payer_mobile: string;
  payment_status: string;
  payment_date: string;
  created_at: string;
}

const TaxPaymentReceipt = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState<PaymentDetails | null>(null);
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    if (!orderId) {
      toast.error("Invalid payment reference");
      navigate("/tax-payment");
      return;
    }

    verifyPayment();
  }, [orderId]);

  const verifyPayment = async () => {
    try {
      setLoading(true);

      // Call verify endpoint
      const { data, error } = await supabase.functions.invoke("verify-tax-payment", {
        body: { orderId },
      });

      if (error) throw error;

      console.log("Payment verification:", data);
      setPayment(data.payment);

      if (data.payment.payment_status === "success") {
        toast.success("Payment successful!");
      } else {
        toast.error("Payment failed or pending");
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      toast.error("Failed to verify payment");
    } finally {
      setLoading(false);
    }
  };

  const downloadReceipt = () => {
    if (!payment) return;

    const receiptContent = `
TAX PAYMENT RECEIPT
===================

Receipt ID: ${payment.id}
Order ID: ${payment.order_id}
Payment ID: ${payment.payment_id || "N/A"}

Payer Details:
- Name: ${payment.payer_name}
- Mobile: ${payment.payer_mobile}

Payment Details:
- Tax Type: ${payment.tax_type}
- Amount: ₹${payment.amount}
- Status: ${payment.payment_status.toUpperCase()}
- Date: ${payment.payment_date ? format(new Date(payment.payment_date), "dd MMM yyyy, hh:mm a") : "N/A"}

Thank you for your payment!
    `;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tax-receipt-${payment.order_id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-lg text-muted-foreground">Verifying payment...</p>
        </div>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[400px]">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Payment Not Found</h2>
            <p className="text-muted-foreground mb-4">
              Unable to retrieve payment details. Please contact support if you have made a payment.
            </p>
            <Button onClick={() => navigate("/tax-payment")}>Back to Payment</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isSuccess = payment.payment_status === "success";

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader className="text-center">
          {isSuccess ? (
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          ) : (
            <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
          )}
          <CardTitle className="text-2xl">
            {isSuccess ? "Payment Successful" : "Payment Failed"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Receipt ID:</span>
              <span className="font-mono text-sm">{payment.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order ID:</span>
              <span className="font-mono text-sm">{payment.order_id}</span>
            </div>
            {payment.payment_id && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment ID:</span>
                <span className="font-mono text-sm">{payment.payment_id}</span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Payment Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax Type:</span>
                <span className="font-medium">{payment.tax_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-bold text-lg">₹{payment.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span
                  className={`font-medium ${
                    isSuccess ? "text-green-600" : "text-destructive"
                  }`}
                >
                  {payment.payment_status.toUpperCase()}
                </span>
              </div>
              {payment.payment_date && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Date:</span>
                  <span className="font-medium">
                    {format(new Date(payment.payment_date), "dd MMM yyyy, hh:mm a")}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Payer Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">{payment.payer_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mobile:</span>
                <span className="font-medium">{payment.payer_mobile}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="flex-1"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
            {isSuccess && (
              <Button onClick={downloadReceipt} className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Download Receipt
              </Button>
            )}
          </div>

          {!isSuccess && (
            <Button
              onClick={() => navigate("/tax-payment")}
              variant="default"
              className="w-full"
            >
              Try Again
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxPaymentReceipt;
