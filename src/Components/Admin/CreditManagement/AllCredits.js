import React, {useContext, useState, useRef } from 'react';
import Fade from 'react-reveal/Fade';
import Proxy from '../../../Contexts/Proxy.js';
import AppLanguage from '../../../Contexts/AppLanguage.js';
import '../../../style/adminAllCredits.css';
import AddCredit from './AddCredit';
import CreditsList from './CreditsList';
import Logo from '../../Logo';
import { useAlert } from 'react-alert';
export default (props) => {
    const idOfModal = 'editCreditModal';
    const closeModalButton = useRef(null);
    const { appLanguage } = useContext(AppLanguage);
    const { proxy } = useContext(Proxy);
    const [currentCredit, setCurrentCredit] = useState();
    const alert = useAlert();
    function changeCurrentCredit({ name, min_value, max_value, min_term, max_term, description, percent, id }) {
        if (currentCredit && currentCredit.id === id)
            return;
        setCurrentCredit({
            name: name,
            min_value: min_value,
            max_value: max_value,
            min_term: min_term,
            max_term: max_term,
            description: description,
            percent: percent,
            id: id
        })
    }
    async function changeCredit(newCredit) {
        const resp = await fetch(proxy + '/updateCreditTypes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('adminToken')
            },
            body: JSON.stringify(newCredit)
        })
        const json = await resp.json();
        if (json.status === 'ok') {
            props.changeCreditsArray(props.creditsArray.map((value) => {
                if (value.id === newCredit.id) {
                    Object.assign(value, newCredit);
                }
                return value;
            }));
            closeModalButton.current.click();
            alert.success(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Succes' : 'Успіх'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'Credit has been changed' : 'Кредит змінено'}</p></div>);
        } else if (json.status === 'error') {
            alert.error(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Error' : 'Помилка'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'Something has gone wrong. Try again later' : "Щось пішло не так. Спробуйте пізніше"}</p></div>);
        }
        return await json;
    }

    function deleteCredit(removedId) {
        fetch(proxy + '/deleteCreditType', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('adminToken')
            },
            body: JSON.stringify({
                'id': removedId
            })
        }).then(resp => resp.json()).then(json => {
            if (json.status === 'ok') {
                alert.success(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Succes' : 'Успіх'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'Credit has been deleted' : 'Кредит видалено'}</p></div>);
                const newArray = props.creditsArray.filter(value => removedId !== value.id);
                props.changeCreditsArray(newArray);
            } else if (json.status === 'error') {
                alert.error(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Error' : 'Помилка'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'Something has gone wrong. Try again later' : "Щось пішло не так. Спробуйте пізніше"}</p></div>);
            }
        });
    }
    async function addCredit(newCredit) {
        const newArray = props.creditsArray.slice();
        let resp = await fetch(proxy + '/setCreditType', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('adminToken')
            },
            body: JSON.stringify(newCredit)
        })
        const json = await resp.json();
        if (json.id) {
            alert.success(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Succes' : 'Успіх'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'Credit has been added' : 'Кредит додано'}</p></div>);
            newCredit.id = json.id;
            newArray.unshift(newCredit)
            props.changeCreditsArray(newArray);
        } else if (json.status === 'error') {
            alert.error(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Error' : 'Помилка'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'Something has gone wrong. Try again later' : "Щось пішло не так. Спробуйте пізніше"}</p></div>);
        } else if (json.status === 'limit') {
            alert.info(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Info' : 'Інфо'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'Credit limit is 10' : 'Максимальна кількість кредитів - 10'}</p></div>);
        }
        return await json;
    }
    return (
        <Fade>
            <div className='container-fluid p-0 admin-all-credits-wrapper'>
                <div className='container admin-add-credit'>
                    <div className="jumbotron p-1 p-sm-4 p-lg-5 m-0 rounded-0 bg-transparent">
                        <h2 className='text-center p-sm-3 p-1 m-0 mb-sm-2 admin-add-credit-title title'>{appLanguage === 'eng' ? 'Add credit' : 'Додати кредит'}</h2>
                        <AddCredit onSubmitFunction={addCredit} />
                    </div>
                </div>
                <div className='container-fluid p-0 admin-credits-list-wrapper'>
                    <div className='container p-0 p-lg-2 admin-credits-list'>
                        <div className="jumbotron p-1 m-0 rounded-0 bg-transparent">
                            <h2 className='text-center p-sm-3 p-1 m-0 mb-sm-2 admin-all-credits-title title'>{appLanguage === 'eng' ? 'All credits' : 'Всі кредити'}</h2>
                            <CreditsList
                                changeCurrentCredit={changeCurrentCredit}
                                idOfModal={idOfModal}
                                deleteCredit={deleteCredit}
                                creditsArray={props.creditsArray}
                            />
                        </div>
                    </div>
                </div>
                <div className={`modal fade signForm p-0 user-fall-back`} id={idOfModal} tabIndex="-1" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <Logo />
                                <button ref={closeModalButton} type="button" className="close p-0 mt-1" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className='modal-body'>
                                <h3 className='admin-all-credits-modal-title text-center'>{appLanguage === 'eng' ? 'Edit credit' : 'Змінити кредит'}</h3>
                                {
                                    currentCredit ? <div className='change-credit'>
                                        <AddCredit
                                            onSubmitFunction={changeCredit}
                                            nameValue={currentCredit.name}
                                            minValue={currentCredit.min_value}
                                            maxValue={currentCredit.max_value}
                                            minTerm={currentCredit.min_term}
                                            maxTerm={currentCredit.max_term}
                                            description={currentCredit.description}
                                            percent={currentCredit.percent}
                                            id={currentCredit.id}
                                        />
                                    </div> : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    )
}
