import { Dialog, DialogBackdrop, DialogPanel, DialogProps } from '@headlessui/react';
import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

export type ModalProps = PropsWithChildren<DialogProps>;

export const Modal = ({ children, className, ...dialogProps }: ModalProps) => {
  return (
    <Dialog
      transition
      className={twMerge(
        'z-[90] fixed inset-0 flex w-screen items-center justify-center bg-black/40 p-4 transition duration-300 ease-out data-[closed]:opacity-0',
        className as string,
      )}
      {...dialogProps}
    >
      <div className="fixed inset-0 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-[480px] rounded-2xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
            {children}
          </DialogPanel>
        </div>
      </div>

      <DialogBackdrop />
    </Dialog>
  );
};
