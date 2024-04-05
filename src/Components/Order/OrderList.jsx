import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  fetchOrder, fetchOrderById, orderDeleteById } from "../../../utils/Api";

const OrderList = () => {
  const [rerender, setRerender] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector((state) => state.val.data);
  const status = useSelector((state) => state.val.status);
  const error = useSelector((state) => state.val.error);

  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch, rerender]);

  const handleEdit = (id) => {
    dispatch(fetchOrderById(id));
    navigate("/orderedit");
  };

  const handleInvoice = (id) => {
    dispatch(fetchOrderById(id));
    navigate("/orderinvoice");
  };

  const handleDelete = (id) => {
    dispatch(orderDeleteById(id)).then(() => {
      setRerender((prevState) => !prevState);
    });
  };

   // Check if products is not available or not an array
   if (!orders || !Array.isArray(orders)) {
    return <div>Loading...</div>; // You can replace this with a loading indicator
  }

  return (
    <div>
      <h1 className="text-center">Order Table</h1>
      <div className="p-2">
      <button className="btn d-flex ms-auto" style={{color:"white",backgroundColor:"#0eb657"}} onClick={()=>{
        navigate('/orderadd')
      }}>
        Add Order
      </button>
      </div>
      <div class="table-responsive">
        <table class="table align-middle mb-0 bg-white">
          <thead class="bg-light">
            <tr>
              <th scope="col">Order Id</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Ordered Product</th>
              <th scope="col">Role</th>
              <th scope="col">Invoice</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((item, index) => {
              return (
                <>
                  <tr key={index}>
                    <th scope="row">{item.orderId}</th>
                    <td>
                    <p class="fw-normal mb-1">{item.customerName}</p>
                    </td>
                    <td>
                      <p class="fw-normal mb-1">{item.productName}</p>
                    </td>
                    <td>
                      <p class="fw-normal mb-1">{item.orderStatus}</p>
                    </td>
                    <td>
                    <button
                          type="button"
                          class="btn btn-primary rounded-4 btn-sm"
                          onClick={() => {
                            handleInvoice(item.orderId);
                          }}
                        >
                          Invoice
                        </button>
                    </td>
                    <td>
                      <div className="d-flex me-3">
                        <button
                          type="button"
                          class="btn btn-primary rounded-4 btn-sm"
                          onClick={() => {
                            handleEdit(item.orderId);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger rounded-4 btn-sm mx-2"
                          onClick={() => {
                            handleDelete(item.orderId);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
