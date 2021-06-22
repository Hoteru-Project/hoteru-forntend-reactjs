import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import i18n from "i18next";
class Test2 extends Component {
    state = {  }
    render() { 
        const {t} = this.props;
        return ( <div>{t('log_in')}</div> );
    }
}

export default withTranslation()(Test2);