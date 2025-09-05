import { toast as sonnerToast } from "sonner";

export function successToast(message: string) {
  sonnerToast(
    <div className={`text-lime-400 font-bold`}>{message}</div>,
  );
}

export function errorToast(message: string) {
  sonnerToast(
    <div className={`text-red-400 font-bold`}>{message}</div>,
  );
}

export function infoToast(message: string) {
  sonnerToast(
    <div className={`text-blue-400 font-bold`}>{message}</div>,
  );
}
