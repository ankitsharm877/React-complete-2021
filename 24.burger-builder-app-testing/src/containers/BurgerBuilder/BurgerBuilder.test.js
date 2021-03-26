import react from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>);
    });

    it('should render <BuildControls /> when receiving salad ingredient', () => {
        wrapper.setProps({ings: {salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });

    it('should render <BuildControls /> when receiving all ingredients', () => {
        wrapper.setProps({ings: {
            salad: 0,
            cheese: 0,
            meat: 0,
            bacon: 0
        }});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });

    it('should render <OrderSummary /> when receiving salad ingredient', () => {
        wrapper.setProps({ings: {salad: 0}});
        expect(wrapper.find(OrderSummary)).toHaveLength(1);
    });

    it('should not render <OrderSummary /> when not receiving ingredients', () => {
        wrapper.setProps({ings: null});
        expect(wrapper.find(OrderSummary)).toHaveLength(0);
    });

    
});