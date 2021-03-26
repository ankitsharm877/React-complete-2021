import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    /* it('should render three <NavigationItems /> elements if not authenticated', () => {
        const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render three <NavigationItems /> elements if authenticated', () => {
        const wrapper = shallow(<NavigationItems isAuthenticated/>);
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    }); */

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });
    it('should render three <NavigationItems /> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render three <NavigationItems /> elements if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render <NavigationItems /> elements with Authenticate link if not authenticated', () => {
        expect(wrapper.contains(<NavigationItem link="/auth">Authenticate</NavigationItem>)).toEqual(true);
    });

    it('should render <NavigationItems /> elements with logout link if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });


});