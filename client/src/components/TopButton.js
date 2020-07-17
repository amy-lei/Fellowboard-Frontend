import React from 'react';
import {Button, Icon} from "semantic-ui-react";

function TopButton(props) {

    const scrollToTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    return(
        <div>
            <Button
                    circular
                    icon={<Icon inverted name='arrow up'/>}
                    size='big'
                    color='black'
                    className='scroll-button'
                    onClick={scrollToTop}
            />
        </div>
    )
}

export default TopButton;