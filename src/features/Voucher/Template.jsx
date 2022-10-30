import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllReceipts } from '../Receipt/receiptSlice';
import Services from '../Receipt/services';

const Template = () => {
  const receipt = useSelector(state => state.receipt);
  const dispatch = useDispatch();

  const checkReceipt = receipt.receipts[0];

  const calcSubTotal = () => {
    let total = 0;
    checkReceipt.items.forEach(item => {
      total = total + Number(item.lineTotal);
    })
    return total;
  }

  const calcDiscount = () => {
    let disTotal = 0;
    checkReceipt.items.forEach(item => {
      disTotal = disTotal + Number(item.discount);
    })
    return disTotal;
  }

  const printInvoice = () => {
    window.print();
  }

  useEffect(() => {
    Services.getReceipts()
      .then(res => {
        const receipts = res.data;
        dispatch(getAllReceipts(receipts))
      })
  }, [])

  return (
    <>
  {
    checkReceipt && (
      <section className='container mx-auto px-2 mb-10'>
      <header className='flex flex-col mt-9 pb-4 gap-6'> 
        <section id="logo" className='flex justify-between'>
          <div className='logo flex items-center gap-2'>
            <div className="logo-box w-16 h-16">
              <div className="logo-box w-12 h-12">
                <div className="logo-box w-8 h-8">
                  <div className="inner-box w-4 h-4 border-4 border-primary"></div>
                </div>
              </div>
            </div>
            <h2 className='flex flex-col'>
              <img src={checkReceipt.companyLogo} alt="Company Logo" className='w-36' />
            </h2>
          </div>
          <div>
            <h1 className='text-5xl font-semibold'>Sales Receipt</h1>
          </div>
        </section>
        <section className='flex justify-between border-t-4 border-b-4 border-primary pt-5 pb-5'>
          <div className="company-details">
            <h2>{checkReceipt.companyName}</h2>
            <p className='font-light'>{checkReceipt.companySlogan}</p>
          </div>
          <div className="date">
            <h2>
              <span className='font-bold'>Date: </span>
              <span>{checkReceipt.paymentInfo.paymentDate}</span>
            </h2>
            <h2>
              <span className='font-bold'>Invoice #: </span>
              <span>INV001</span>
            </h2>
          </div>
        </section>
      </header>

      <section className='client flex gap-4 ml-20'>
        <h3 className='font-bold'>Sold to: </h3>
        <div className="client-details">
          <p>{checkReceipt.clientName}</p>
          <p>{checkReceipt.clientCompany}</p>
          <p>{checkReceipt.clientStreet}</p>
          <p>{checkReceipt.clientCity}</p>
          <p>{checkReceipt.clientContact}</p>
        </div>
      </section>

      <section className="payment-method mt-10">
        <table className='table-auto w-full border-separate'>
          <thead className='bg-secondary-200 text-secondary-300'>
            <tr>
              <th className='p-2'>Payment Method</th>
              <th className='p-2'>Check No.</th>
              <th className='p-2'>Received By</th>
            </tr>
          </thead>
          <tbody className='bg-gray-300'>
            <tr>
              <td className='p-2 text-center'>{checkReceipt.type}</td>
              <td className='p-2 text-center'>{checkReceipt.type === 'cheque' ? checkReceipt.paymentInfo.chequeNo : 'N/A'}</td>
              <td className='p-2 text-center'>{checkReceipt.paymentInfo.receiveBy}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="item-details mt-12">
        <table className='table-auto w-full border-separate'>
          <thead className='bg-secondary-300 text-white'>
            <tr>
              <th className='p-2 text-xs'>Qty</th>
              <th className='p-2 text-xs'>Item #</th>
              <th className='p-2 text-xs'>Description</th>
              <th className='p-2 text-xs'>Unit Price</th>
              <th className='p-2 text-xs'>Discount</th>
              <th className='p-2 text-xs'>Line Total</th>
            </tr>
          </thead>
          <tbody className='bg-gray-300'>
            {
              checkReceipt.items?.map((item) => (
                <tr>
                  <td className='p-2 text-center text-sm'>{item.quantity}</td>
                  <td className='p-2 text-center text-sm'>{item.name}</td>
                  <td className='p-2 text-center text-sm'>{item.desc}</td>
                  <td className='p-2 text-center text-sm'>{item.price}</td>
                  <td className='p-2 text-center text-sm'>{item.discount}</td>
                  <td className='p-2 text-center text-sm'>{item.lineTotal}</td>
                </tr>
              ))
            }
            <tr className='bg-white'>
              <td colSpan={4} className='text-right font-semibold text-sm p-2'>Total Discount</td>
              <td className='bg-gray-300 text-center text-sm p-2'>{calcDiscount()}</td>
            </tr>
            <tr className='bg-white'>
              <td colSpan={5} className='text-right font-semibold text-sm p-2'>Subtotal</td>
              <td className='bg-secondary-100 text-center font-bold p-2'>{calcSubTotal()}</td>
            </tr>
            <tr className='bg-white'>
              <td colSpan={5} className='text-right font-semibold tex-sm p-2'>Sales Tax</td>
              <td className='bg-secondary-100 text-center font-bold'>150</td>
            </tr>
            <tr className='bg-white'>
              <td>
                <button type='button' onClick={printInvoice} className='printBtn bg-indigo-600 text-white px-4 py-2 rounded hover:shadow hover:shadow-black transition ease-out duration-300'>Print Invoice</button>
              </td>
              <td colSpan={4} className='text-right font-semibold text-sm p-2'>Total</td>
              <td className='bg-secondary-100 text-center font-bold p-2'>30,150</td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
    )
  }
    </>
  )
}

export default Template
