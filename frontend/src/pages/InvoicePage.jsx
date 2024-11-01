import React, { useRef } from 'react';
import Logo from '../assets/Logo.png';
import { useRecoilValue } from "recoil";
import { invoiceAtom } from '../store/atom';
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';

const InvoicePage = () => {
    const invoice = useRecoilValue(invoiceAtom);
    console.log(typeof (invoice.items.baseAmount))
    const navigate = useNavigate();
    const contentRef = useRef(null); // Reference to the PDF container

    if (!localStorage.getItem("token")) {
        navigate("/");
    }

    const totalBaseAmount = invoice.items.reduce((sum, item) => sum + item.baseAmount, 0);
    const totalGstAmount = invoice.items.reduce((sum, item) => sum + item.gstAmount, 0);
    const totalAmount = invoice.items.reduce((sum, item) => sum + item.totalAmount, 0);

    const reactToPrintFn = useReactToPrint({ contentRef });

    return (
        <>
            <div className="flex justify-center items-center my-4">
                <button
                    onClick={reactToPrintFn}
                    className="bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:from-orange-500 hover:to-orange-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300"
                >
                    Print Invoice
                </button>
            </div>

            <div ref={contentRef} className="min-h-screen flex flex-col bg-white px-1 font-sans mx-3">
                {/* Main Invoice Content */}
                <div className="flex-grow relative z-10 w-[100%] h-[100%] bg-white p-4">
                    {/* Watermark */}
                    <div className="absolute top-[25%] inset-0 flex justify-center items-center opacity-[.05] pointer-events-none z-20 watermark">
                        <img
                            src={Logo}
                            alt="Phoenix Watermark"
                            className="w-[80%] h-[60%] object-contain"
                        />
                    </div>

                    {/* Invoice header */}
                    <div className="flex justify-between items-center pb-16">
                        <div className="bg-[#E85523] px-8 inline-block py-5">
                            <h1 className="text-5xl font-bold text-white">Invoice</h1>
                        </div>
                        <div>
                            <img src={Logo} alt="Phoenix Technosoft Logo" className="h-24" />
                        </div>
                    </div>

                    {/* Billed To and Billing Details */}
                    <div className="flex justify-between space-x-12">
                        <div className="w-1/2">
                            <h2 className="text-xl font-bold text-[#E85523] mb-2">BILLED TO</h2>
                            <p className="text-lg font-semibold text-orange-600">{invoice.name}</p>
                            <p className="text-lg text-orange-600">GST - {invoice.gstNo}</p>
                            <p className="text-gray-600">{invoice.address}</p>
                            <p className="text-lg font-bold text-[#E85523]">{invoice.gstIn}</p>
                        </div>

                        <div className="w-1/2">
                            <h2 className="text-xl font-bold text-[#E85523] mb-2">BILLING DETAILS</h2>
                            <p className="text-lg font-semibold text-orange-600">PHOENIX TECHNOSOFT</p>
                            <p className="text-orange-600">ACCOUNT NUMBER - 924020034149080</p>
                            <p className="text-orange-600">IFSC - UTIB0002498</p>
                            <p className="text-orange-600">UPI - PHOENIXTECH@AXISBANK</p>
                            <p className="text-gray-600">Shop No-65, New Defence Colony, Muradnagar, Ghaziabad, Uttar Pradesh, 201206</p>
                            <p className="text-gray-600">GST - 09ASPPT1664A1ZI</p>
                        </div>
                    </div>

                    <div className="mt-12">
                        <p className="text-lg font-bold text-[#E85523]">DATE: {invoice.date}</p>
                        <p className="text-2xl text-gray-600">INVOICE#  {invoice.invoiceNo}</p>
                    </div>

                    {/* Invoice Description Table */}
                    <div className="">
                        <div className="">
                            <table className="w-full mt-4 text-left">
                                <thead>
                                    <tr>
                                        <th className="text-xl py-2 text-[#E85523]">DESCRIPTION</th>
                                        <th className="text-right py-2 text-gray-600">SAC Code</th>
                                        <th className="text-right py-2 text-gray-600">GST (18%)</th>
                                        <th className="py-2 text-right text-gray-600">AMOUNT</th>
                                    </tr>
                                </thead>
                                <tbody className="border-t-4 border-[#E85523]">
                                    {invoice.items.map((item, index) => (
                                        <tr key={index}>
                                            <td className="text-lg pt-4 text-gray-800">{item.description}</td>
                                            <td className="text-lg pt-4 text-right text-gray-800">998352</td>
                                            <td className="text-lg pt-4 text-right text-gray-800">{new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(item.gstAmount)}</td>
                                            <td className="text-lg pt-4 text-right text-gray-800">{new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(item.baseAmount)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Amount Details */}
                    <div className="flex justify-end mt-4 border-t-2 border-gray-200 pt-4">
                        <div className="w-1/3">
                            <div className="flex justify-between mb-2">
                                <p className="text-gray-700">TOTAL</p>
                                <p className="text-xl text-gray-700">{new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(totalBaseAmount)}</p>
                            </div>
                            <div className="flex justify-between mb-2">
                                <p className="text-gray-700">GST(18%)</p>
                                <p className="text-xl text-gray-700">{new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(totalGstAmount)}</p>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t-2 border-[#E85523] pt-4">
                                <p className="text-black">AMOUNT</p>
                                <p className="text-2xl text-black">{new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(totalAmount)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer always at the bottom */}
                <div className="footer mb-20 pl-6">
                    <p className="text-lg font-semibold text-gray-700 ">Have Questions?</p>
                    <p className="text-gray-600">Call us: 8587 888 326</p>
                    <p className="text-gray-600">Mail us: phoenixtechnosoftindia@gmail.com</p>
                    <p className="text-orange-600 font-bold">www.phoenixtechnosoft.com</p>
                    <p className="italic text-sm text-gray-500 mt-1">
                        This package is prepared by Phoenix Technosoft<br />
                        For any discrepancy, kindly connect within 24 hours from the date of generation.<br />
                        No refunds will be entertained.
                    </p>
                </div>
            </div>
        </>
    );
}

export default InvoicePage;
