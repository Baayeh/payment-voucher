import React, { useState, useRef } from 'react'
import Services from './services';
import { createReceipt } from '../Receipt/receiptSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const CreateReceipt = () => {
  const [companyName, setName] = useState('');
  const [companySlogan, setSlogan] = useState('');
  const [companyLogo, setLogo] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientStreet, setClientStreet] = useState('');
  const [clientCity, setClientCity] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentBy, setPaymentBy] = useState('');
  const [receiveBy, setReceiveBy] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankBranch, setBankBranch] = useState('');
  const [chequeNo, setCheckNo] = useState('');
  const [qty, setQty] = useState('');
  const [itemname, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [itemDiscount, setItemDiscount] = useState('');
  const [items, setItems] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  const [updateQty, setUpdateQty] = useState('');
  const [updateItemName, setUpdateItemName] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [updateItemPice, setUpdateItemPice] = useState('');
  const [updateDiscount, setUpdateDiscount] = useState('');
  const [itemIndex, setItemIndex] = useState(0);

  const toast = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showModal = (item, index) => {
    setItemIndex(index);
    setDisplayModal(true);
    setUpdateQty(item.quantity);
    setUpdateItemName(item.name);
    setUpdateDescription(item.desc);
    setUpdateItemPice(item.price);
    setUpdateDiscount(item.discount);
  };

  const hideModal = () => setDisplayModal(false);

  const addItem = () => {
    const total = Number(qty) * Number(unitPrice);
    const discount = Number(itemDiscount) > 0 ? total * (Number(itemDiscount) / 100) : 0;
    const newTotal = total - discount;

    let itemObject = {
      quantity: qty,
      name: itemname,
      desc: itemDescription,
      price: unitPrice,
      discount: itemDiscount,
      lineTotal: newTotal
    }
    setItems((current) => [...current, itemObject]);
    setQty('');
    setItemName('');
    setItemDescription('');
    setUnitPrice('');
    setItemDiscount('');
  }

  const updateItem = () => {
    const total = Number(updateQty) * Number(updateItemPice);
    const discount = Number(updateDiscount) > 0 ? total * (Number(updateDiscount) / 100) : 0;
    const newTotal = total - discount;
    let updatedItem = {
      quantity: updateQty,
      name: updateItemName,
      desc: updateDescription,
      price: updateItemPice,
      discount: updateDiscount,
      lineTotal: newTotal
    }

    const newItemList = [
      ...items, 
    ]
    newItemList.splice(itemIndex, 1, updatedItem);
    setItems(newItemList);
    toast.current.show({ severity: 'success', summary: 'Confirmed', detail: 'You have updated item', life: 3000 });
    hideModal();
  }

  const deleteItem = () => {
    confirmDialog({
      message: 'Are you sure you want to delete item?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: () => {
        const result = items.filter((item, index) => index !== itemIndex);
        setItems(result);
        toast.current.show({ severity: 'success', summary: 'Confirmed', detail: 'You have deleted item', life: 3000 });
        hideModal();
      }
    });
  }

  const calTotalAmountofItmes = () => {
    let result = 0;
    items?.forEach((item) => {
      result += item.lineTotal;
    });
    return result;
  }

  const addReceipt = (e) => {
    e.preventDefault();
    
    const receiptObj = {
      id: Math.floor(Math.random() * 999),
      companyName,
      companySlogan,
      companyLogo,
      clientName,
      clientCompany,
      clientStreet,
      clientCity,
      clientContact,
      clientEmail,
      type,
      paymentInfo: type === 'cash' ? {
        amount,
        paymentBy,
        receiveBy,
        paymentDate
      } : {
        amount,
        paymentBy,
        receiveBy,
        paymentDate,
        bankName,
        bankBranch,
        chequeNo
      },
      items: items
    };

    Services.addReceipt(receiptObj)
      .then(() => {
        dispatch(createReceipt(receiptObj));
        navigate('/template')
      })
  }

  const uploadFile = (e) => {
    const file = e.target.files[0];
    getBase64(file).then((data) => {
      setLogo(data);
    });
  }

  // convert file to base64
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  return (
    <section className='create-form pb-12'>
      <Toast ref={toast} />
      <h1 className='text-4xl text-secondary-300 font-bold text-center my-10'>Create Receipt</h1>

      <form onSubmit={(e) => addReceipt(e)}>
        {/* Company Details */}
        <fieldset className='flex border p-4 w-3/5 gap-8 mx-auto'>
          <legend>Company Details</legend>
          <div className='basis-80'>
            <label htmlFor="company-name">
              <input type="text" name="company-name" placeholder='Company Name' required className='peer border p-2 focus:outline-secondary-300 w-full' value={companyName} onChange={(e) => setName(e.target.value)} />
              <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                Please provide a company name
              </p>
            </label>
          </div>

          <div className='basis-72'>
            <label htmlFor="slogan">
              <input type="text" name='slogan' placeholder='Company Slogan' className='border p-2 w-full' value={companySlogan} onChange={(e) => setSlogan(e.target.value)} />
            </label>
          </div>

          <div className=''>
            <label htmlFor="company-logo">
              <input type="file" name="company-logo" className='text-sm file:rounded-full file:border-0 file:px-4 file:py-2 file:bg-secondary-100 file:text-sm file:font-semibold hover:file:bg-secondary-200 file:transition file:ease-out file:duration-500 file:cursor-pointer' required onChange={(e) => uploadFile(e)} />
            </label>
          </div>
        </fieldset>

        {/* Client Details */}
        <fieldset className='flex justify-center gap-4 flex-wrap border p-4 w-3/5 mx-auto mt-8'>
          <legend>Client Details</legend>
          <div>
            <label htmlFor="client-name">
              <input type="text" name="client-name" placeholder='Client Name' required className='peer border p-2 focus:outline-secondary-300 w-full' value={clientName} onChange={(e) => setClientName(e.target.value)} />
              <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                Please provide a client name
              </p>
            </label>
          </div>

          <div>
            <label htmlFor="client-company">
              <input type="text" name='client-company' placeholder='Client Company Name' className='border p-2 w-full' value={clientCompany} onChange={(e) => setClientCompany(e.target.value)} />
            </label>
          </div>

          <div>
            <label htmlFor="client-street">
              <input type="text" name='client-street' placeholder='Street Address' className='border p-2 w-full' value={clientStreet} onChange={(e) => setClientStreet(e.target.value)} />
            </label>
          </div>

          <div className=''>
            <label htmlFor="client-city">
              <input type="text" name='client-city' placeholder='City' className='border p-2 w-full' value={clientCity} onChange={(e) => setClientCity(e.target.value)} />
            </label>
          </div>

          <div className=''>
            <label htmlFor="client-contact">
              <input type="text" name='client-contact' placeholder='Phone number' className='border p-2 w-full' value={clientContact} onChange={(e) => setClientContact(e.target.value)} />
            </label>
          </div>

          <div className=''>
            <label htmlFor="client-email">
              <input type="text" name='client-email' placeholder='Client Email' className='border p-2 w-full' value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
            </label>
          </div>
        </fieldset>

        {/* Adding Items */}
        <fieldset className='border p-4 w-3/5 mx-auto mt-8'>
          <legend>Add Itmes</legend>
          <section className='addForm flex justify-center items-center gap-4 flex-wrap'>
            <div>
              <label htmlFor="item-qty">
                <input type="number" name='item-qty' placeholder='Quantity' className='border p-2 w-full' value={qty} onChange={(e) => setQty(e.target.value)} />
              </label>
            </div>

            <div>
              <label htmlFor="item-name">
                <input type="text" name='item-name' placeholder='Item Name' className='border p-2 w-full' value={itemname} onChange={(e) => setItemName(e.target.value)} />
              </label>
            </div>

            <div>
              <label htmlFor="item-desc">
                <input type="text" name='item-desc' placeholder='Item Description' className='border p-2 w-full' value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
              </label>
            </div>

            <div>
              <label htmlFor="item-price">
                <input type="number" name='item-price' placeholder='Item Price' className='border p-2 w-full' value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} />
              </label>
            </div>

            <div className='mt-4'>
              <label htmlFor="item-discount">
                <input type="number" name='item-discount' placeholder='Item Discount' className='border p-2 w-full' value={itemDiscount} onChange={(e) => setItemDiscount(e.target.value)} />
              </label>
            </div>
            <div className='mt-4'>
              <button type='button' onClick={addItem} className='p-2 bg-secondary-200 rounded hover:shadow hover:shadow-secondary-200 hover:bg-transparent transition ease-out duration-300'>Add Item</button>
            </div>
          </section>
        </fieldset>

        {/* Display Items */}
        <fieldset className='border p-4 w-3/5 mx-auto mt-8'>
          <legend>Item List</legend>
          <table className='table-auto w-full border-separate'>
            <thead className='bg-secondary-300 text-white'>
              <tr>
                <th className='p-2 text-xs'>Qty</th>
                <th className='p-2 text-xs'>Item #</th>
                <th className='p-2 text-xs'>Unit Price (GHC)</th>
                <th className='p-2 text-xs'>Discount (%)</th>
                <th className='p-2 text-xs'>Line Total (GHC)</th>
                <th className='p-2 text-xs'>Action</th>
              </tr>
            </thead>
            <tbody className='bg-slate-200'>
              {
                items?.map((item, index) => (
                  <tr key={index}>
                    <td className='p-2 text-center text-sm'>{item.quantity}</td>
                    <td className='p-2 text-center text-sm'>{item.name}</td>
                    <td className='p-2 text-center text-sm'>{item.price}</td>
                    <td className='p-2 text-center text-sm'>{item.discount}</td>
                    <td className='p-2 text-center text-sm'>{item.lineTotal}</td>
                    <td className='p-2 text-center text-sm'>
                      <button onClick={() => showModal(item, index)} type='button' className='text-yellow-400 hover:text-yellow-500 transition ease-out duration-300'>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                      </button>
                    </td>
                  </tr>
                ))
              }
              <tr className='bg-white'>
                <td colSpan={4} className='text-right font-semibold text-sm p-2'>Subtotal</td>
                <td className='bg-secondary-100 text-center font-bold p-2'>{calTotalAmountofItmes()}</td>
              </tr>
            </tbody>
          </table>

          <Dialog header='Edit Item' visible={displayModal} style={{ width: '50vw' }} onHide={() => hideModal()}>
              <section className="update-item grid grid-cols-3 place-items-center gap-5">
                <div>
                  <label htmlFor="item-qty">
                    <span>Quantity</span>
                    <input type="number" name='item-qty' placeholder='Quantity' className='border p-2 w-full' value={updateQty} onChange={(e) => setUpdateQty(e.target.value)} />
                  </label>
                </div>

                <div>
                  <label htmlFor="item-name">
                    <span>Item Name</span>
                    <input type="text" name='item-name' placeholder='Item Name' className='border p-2 w-full' value={updateItemName} onChange={(e) => setUpdateItemName(e.target.value)} />
                  </label>
                </div>

                <div>
                  <label htmlFor="item-desc">
                    <span>Description</span>
                    <input type="text" name='item-desc' placeholder='Item Description' className='border p-2 w-full' value={updateDescription} onChange={(e) => setUpdateDescription(e.target.value)} />
                  </label>
                </div>

                <div>
                  <label htmlFor="item-price">
                    <span>Price</span>
                    <input type="number" name='item-price' placeholder='Item Price' className='border p-2 w-full' value={updateItemPice} onChange={(e) => setUpdateItemPice(e.target.value)} />
                  </label>
                </div>

                <div>
                  <label htmlFor="item-discount">
                    <span>Discount</span>
                    <input type="number" name='item-discount' placeholder='Item Discount' className='border p-2 w-full' value={updateDiscount} onChange={(e) => setUpdateDiscount(e.target.value)} />
                  </label>
                </div>
              </section>

              <section className="actions flex justify-center gap-7 mt-8">
                <button onClick={() => deleteItem()} className='flex items-center font-semibold tracking-wide gap-2 border-2 border-red-500 text-red-500 py-2 px-3 text-sm rounded-md hover:bg-red-500 hover:text-white transition ease-out duration-300'>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap='round' strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  <span>Delete Item</span>
                </button>
                <ConfirmDialog />
                <button onClick={() => updateItem()} className='flex items-center font-semibold border-2 border-white tracking-wide gap-2 bg-green-500 text-white py-2 px-3 text-sm rounded-md hover:bg-transparent hover:border-2 hover:border-green-500 hover:text-green-600 transition ease-out duration-300'>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap='round' strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                  <span>Update Item</span>
                </button>
              </section>
          </Dialog>

        </fieldset>

        {/* Payment Details */}
        <fieldset className='flex flex-col justify-evenly items-center flex-wrap border p-4 w-3/5 mx-auto mt-8'>
          <legend>Payment Details</legend>
          <div className="methods flex items-center gap-6">
            <div className="flex items-center">
              <input
                id="push-email"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-secondary-200 focus:ring-secondary-200" value='cash' onChange={(e) => setType(e.target.value)}
              />
              <label htmlFor="push-email" className="ml-3 block text-sm font-medium">
                Cash
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="push-email"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-secondary-200 focus:ring-secondary-200" value='cheque' onChange={(e) => setType(e.target.value)}
              />
              <label htmlFor="push-email" className="ml-3 block text-sm font-medium">
                Cheque
              </label>
            </div>
          </div>

          <section id='cashPayment' className={`flex flex-wrap justify-center gap-2 mt-8 ${type !== 'cash' ? 'hidden' : ''}`} >
            <div className="cash">
              <label htmlFor="cash-amount">
                <input type="text" name='cash-amount' placeholder='Amount' className='border p-2 w-full' value={amount} onChange={(e) => setAmount(e.target.value)} />
              </label>
            </div>

            <div className="cash payment">
              <label htmlFor="paymentBy">
                <input type="text" name='paymentBy' placeholder='Payment By' className='border p-2 w-full' value={paymentBy} onChange={(e) => setPaymentBy(e.target.value)} />
              </label>
            </div>

            <div>
              <label htmlFor="received-by">
                <input type="text" name='received-by' placeholder='Received By' className='border p-2 w-full' value={receiveBy} onChange={(e) => setReceiveBy(e.target.value)} />
              </label>
            </div>

            <div>
              <label htmlFor="paymentDate">
                <input type="date" name='paymentDate' placeholder='Payment Date' className='border p-2 w-full' value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} />
              </label>
            </div>
          </section>

          <section id='chequePayment' className={`flex flex-wrap justify-center gap-2 mt-8 ${type !== 'cheque' ? 'hidden' : ''}`}>
            <div className="cheque">
              <label htmlFor="cheque-amount">
                <input type="text" name='cheque-amount' placeholder='Amount' className='border p-2 w-full' value={amount} onChange={(e) => setAmount(e.target.value)} />
              </label>
            </div>

            <div>
              <label htmlFor="paymentBy">
                <input type="text" name='paymentBy' placeholder='Payment By' className='border p-2 w-full' value={paymentBy} onChange={(e) => setPaymentBy(e.target.value)} />
              </label>
            </div>

            <div>
              <label htmlFor="received-by">
                <input type="text" name='received-by' placeholder='Received By' className='border p-2 w-full' value={receiveBy} onChange={(e) => setReceiveBy(e.target.value)} />
              </label>
            </div>

            <div>
              <label htmlFor="paymentDate">
                <input type="date" name='paymentDate' placeholder='Payment Date' className='border p-2 w-full' value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} />
              </label>
            </div>

            <div>
              <label htmlFor="bankName">
                <input type="text" name='bankName' placeholder='Bank Name' className='border p-2 w-full' value={bankName} onChange={(e) => setBankName(e.target.value)} />
              </label>
            </div>

            <div>
              <label htmlFor="bankBranch">
                <input type="text" name='bankBranch' placeholder='Branch' className='border p-2 w-full' value={bankBranch} onChange={(e) => setBankBranch(e.target.value)} />
              </label>
            </div>
              <label htmlFor="chequeNo">
                <input type="text" name='chequeNo' placeholder='Cheque Number' className='border p-2 w-full' value={chequeNo} onChange={(e) => setCheckNo(e.target.value)} />
              </label>
            <div>

            </div>
          </section>
        </fieldset>

        <div className="form-actions flex justify-center p-10">
          <button type='submit' className='bg-green-500 px-4 py-2 uppercase hover:bg-green-800 hover:text-white hover:shadow hover:shadow-black transition ease-out duration-300'>Create Invoice</button>
        </div>
      </form>
    </section>
  )
}

export default CreateReceipt
