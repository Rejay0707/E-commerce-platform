import {Link,useParams} from 'react-router-dom';
import {Row,Col,ListGroup,Image,Button,Card,} from 'react-bootstrap'
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrderDetailsQuery,usePayOrderMutation,useDeliverOrderMutation} from '../slices/ordersApiSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';




const OrderScreen = () => {
    const {id:orderId}=useParams();

    const {data:order,refetch,isLoading,error}=useGetOrderDetailsQuery(orderId);
    console.log(order);

    const [payOrder,{isLoading:loadingPay}]=usePayOrderMutation();

    const [deliverOrder,{isLoading:loadingDeliver}]=useDeliverOrderMutation();

    const {userInfo}=useSelector((state)=>state.auth);

    // function onApprove(){}
    // function onError(){}
    // function createOrder(){}
    async function onApproveText(){
        await payOrder({orderId, details: { payer: {}}});
        refetch();
        toast.success('Payment Successfull')
        
    }

    //     <ListGroup>
    //     <ListGroup.Item>
    //     <div>
    //     <p>
    //     <Message variant='success'>Paid on </Message>
    //     </p>
    //     </div>
    //     </ListGroup.Item>
    // </ListGroup>
    const deliverOrderHandler=async ()=>{
        try {
            await deliverOrder(orderId);
            refetch();
            toast.success('Order delivered')
        } catch(err) {
            toast.error(err?.data?.message||err.message);
        }
    };
    
    return( 
    isLoading?<Loader/>:error?<Message variant='danger' />:(
        <>
        <h1>Order {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Name:</strong>{order.user.name}
                        </p>
                        <p>
                            <strong>Email:</strong>{order.user.email}
                        </p>
                        <p>
                            <strong>Address:</strong>
                            {order.shippingAddress.address},{order.shippingAddress.city}{''}
                            {order.shippingAddress.postalCodal},{order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? (
                        <Message variant='success'>
                        Delivered on {order.deliveredAt}
                        </Message>
                        ) : (
                        <Message variant='danger'>Not Delivered</Message>
                        )}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method:</strong>{order.paymentMethod}
                        </p>
                        {order.isPaid?(
                            <Message variant='success'>`Paid on {order.paidAt}` </Message>
                        ):(
                            <Message variant='danger'>
                                Not Paid
                            </Message>
                        )}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.map((item,index)=>(
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                        {console.log('his')}
                                    </Col>
                                    <Col>
                                        <Link to={`/product/${item.product}`}>
                                        {item.name}
                                        {console.log(item.name)}
                                        </Link>
                                    </Col>
                                    <Col md={4}>
                                        {item.qty} x ${item.price}=${item.qty*item.price};
                                    </Col>
                                </Row>
                            </ListGroup.Item>    
                        ))}
                        
                    </ListGroup.Item>
                    </ListGroup>
                    </Col>
                    

                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                    {console.log(order.itemsPrice)}
                                </Row>

                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>

                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>

                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {!order.isPaid&&(
                                <ListGroup.Item>
                                    {loadingPay&&<Loader/>}

                                    
                                        <div>
                                            <Button onClick={onApproveText} style={{margin:'10px'}}>Test Pay Order</Button>
                                            <div>
                                                <payPalButtons>
                                                    {/* createOrder={createOrder}
                                                    onApprove={onApprove}
                                                    onError={onError} */}
                                                </payPalButtons>
                                            </div>
                                        </div>
                                    
                                </ListGroup.Item>
                            )}
                                {loadingDeliver && <Loader />}
                                {userInfo && 
                                userInfo.isAdmin&&
                                
                                !order.isDelivered &&(
                                    <ListGroup.Item>
                                        <Button
                                        type='button'
                                        className='btn btn-block'
                                        onClick={deliverOrderHandler}
                                        >
                                            Mark As Delivered
                                        </Button>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card>
                    </Col>
                    </Row>
        </>
    )
    )
    

}

export default OrderScreen





