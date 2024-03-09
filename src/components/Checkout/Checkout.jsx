import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { CartContext } from '../CartContext/CartContext';
import './Checkout.css'

const Checkout = () => {
    const { cart, clearCart } = useContext(CartContext);
    const [formData, setFormData] = useState({ name: '', email: '', confirmEmail: '', phone: '' });
    const [alertMessage, setAlertMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if (formData.email !== formData.confirmEmail) {
            alert('Los correos electrónicos no coinciden');
            return;
        }

        const orderData = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            items: cart.map(item => ({ title: item.title, quantity: item.quantity, price: item.price })),
            total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
        };

        const db = getFirestore();
        const ordersCollection = collection(db, 'orders');

        try {
            const docRef = await addDoc(ordersCollection, orderData);
            console.log('Orden guardada con ID: ', docRef.id);
            setAlertMessage(`Compra exitosa. ID de la orden: ${docRef.id}`);
            clearCart();
        } catch (error) {
            console.error('Error al guardar la orden: ', error);
        }
    };

    return (
        <div>
            <h2>Checkout</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese su nombre" name="name" value={formData.name} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Ingrese su email" name="email" value={formData.email} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formConfirmEmail">
                    <Form.Label>Confirmar Email</Form.Label>
                    <Form.Control type="email" placeholder="Confirme su email" name="confirmEmail" value={formData.confirmEmail} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control type="tel" placeholder="Ingrese su teléfono" name="phone" value={formData.phone} onChange={handleChange} required />
                </Form.Group>

                <Button className='button-check' variant="primary" type="submit">
                    Confirmar compra
                </Button>
            </Form>
            {alertMessage && (
                <div className="alert alert-success mt-3" role="alert">
                    {alertMessage}
                </div>
            )}
        </div>
    );
};

export default Checkout;
