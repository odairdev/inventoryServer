import { number } from "yup/lib/locale";

export function CheckProductAmount(type: string, orderAmount: number, productAmount: number): number  {
    if(type === 'out' && productAmount < orderAmount) {
        return -1;
    }

    let finalProductAmount = productAmount;

    if(type === 'in') {
        finalProductAmount += orderAmount
    } else {
        finalProductAmount -= orderAmount
    }

    return finalProductAmount;
}