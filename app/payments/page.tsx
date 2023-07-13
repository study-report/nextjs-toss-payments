"use client";

import { useEffect, useRef, useState } from "react";
import {
  loadPaymentWidget,
  PaymentWidgetInstance,
} from "@tosspayments/payment-widget-sdk";
import { ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import config from "@/config";
import { nanoid } from "nanoid";

const clientKey = config.clientKey;
const customerKey = ANONYMOUS;

export default function App() {
  const [price, setPrice] = useState(50_000);

  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null);

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        "#payment-widget",
        price
      );

      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) return;

    paymentMethodsWidget.updateAmount(
      price,
      paymentMethodsWidget.UPDATE_REASON.COUPON
    );
  }, [price]);

  const handlePayments = () => {
    const paymentWidget = paymentWidgetRef.current;

    try {
      paymentWidget
        ?.requestPayment({
          orderId: nanoid(),
          orderName: "토스 티셔츠 외 2건",
          customerName: "김토스",
          customerEmail: "customer123@gmail.com",
          successUrl: `${window.location.origin}/success`,
          failUrl: `${window.location.origin}/fail`,
        })
        .then((r) => console.log(r));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl">주문서</h1>
      <div id="payment-widget" className="w-3/5" />

      <div className="flex items-center gap-1">
        <input
          type="checkbox"
          onChange={(event) =>
            setPrice(event.target.checked ? price - 5_000 : price + 5_000)
          }
        />
        <label>5,000원 할인 쿠폰 적용</label>
      </div>

      <button
        className="mt-2 border border-blue-500 py-2 px-4 rounded text-blue-500 hover:bg-blue-500 hover:text-white mr"
        onClick={handlePayments}
      >
        결제하기
      </button>
    </div>
  );
}
