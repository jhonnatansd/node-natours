import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_51IDe6qIiq7RqlXCok7DB4UBaibyVoXk4Rph33XhSOtBNOY9XzQRC6Ymudxcvz87QhhZGGtx6zrhobevhCL2799fC00AFIu4ROi');

export const bookTour = async tourId => {
    try {
        //1 Get checkout session from API
        const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
        console.log(session);

        //2 Create checkout form + charge credit card
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });
    } catch (error) {
        console.log(error);
        showAlert('error', error);
    }
};