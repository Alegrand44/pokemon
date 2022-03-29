import React, { Fragment, useEffect, useState, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function Modal(props) {
  function closeModal() {
    props.closeModal();
  }

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={closeModal}
      >
        <div
          id="modal"
          className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block bg-white rounded-lg text-left shadow-xl
                transform transition-all sm:my-8 sm:align-middle w-full md:max-w-lg border-4 border-red-700"
            >
              <div className="flex flex-row-reverse absolute w-full pr-2 pt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  onClick={closeModal}
                  className="h-4 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div className="p-2">
                <Dialog.Title className="text-2xl text-center font-medium">
                  {props.data?.name}
                </Dialog.Title>
                <div className=" mt-3 w-full">
                  <div className="md:grid md:grid-cols-2 w-full">
                    <div className="mb-3 md:text-center justify-center">
                      <p>
                        <span className="font-bold text-red-700">Dano:</span>
                        {(
                          <span className="text-xl md:text-3xl">
                            {" "}
                            {props.data?.damage}{" "}
                          </span>
                        ) || (
                          <span className="text-yellow-700">
                            {" "}
                            Sem informacao{" "}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="mb-3">
                      <p>
                        <span className="font-bold"> Custo de “mana”</span>
                        <br />{" "}
                        {props.data?.cost?.map((cost, idx) => {
                          return (
                            <button
                              key={idx}
                              className="px-2 m-1 text-white bg-blue-800 rounded-full cursor-default"
                            >
                              {cost}
                            </button>
                          );
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <span className="font-bold text-justify">Descrição:</span>
                    <p>{props.data?.text}</p>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
