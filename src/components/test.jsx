import React, {Component} from "react";
import { withTranslation } from 'react-i18next';
import i18n from "i18next";

class Test extends Component {

    state={
        languages: [
            {
                code:"en",
                name:"English",
                country_code:"US"
            },
            {
                code:"ar",
                name:"Arabic",
                country_code:"EG"
            }
        ]
    }
    render() {
        const {t} = this.props;
        return (
            <div className="container">
              <div className="row justify-content-between">
                  <div className="">
                        <h1 className="text-primary">{t('Welcome to React')}</h1>
                        <h2>{t('log_in')}</h2>
                  </div>
                  <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Language
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            {this.state.languages.map(({code,name})=>
                                <li key={code}>
                                    <button onClick={()=>{
                                        i18n.changeLanguage(code)
                                    }} className="dropdown-item">{name}</button>
                                </li>
                            )
                            }
                        </ul>
                  </div>
              </div>
            </div>
        );
    }
}

export default withTranslation()(Test);
