import 'rsuite/lib/styles/index.less'; // or 'rsuite/dist/styles/rsuite-default.css'
import { Button, Nav, Icon } from 'rsuite';
import React from 'react';

export const TopNav = () => {
    return (
            <Nav appearance="tabs" justified>
                <Nav.Item active icon={<Icon icon="home" />}  >Users</Nav.Item>
                <Nav.Item componentClass={}>News</Nav.Item>
                <Nav.Item>Solutions</Nav.Item>
            </Nav>
    );
}