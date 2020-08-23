import React, { useEffect, useContext, useState, useRef } from 'react';
import Fade from 'react-reveal/Fade';
import Proxy from '../../../Contexts/Proxy.js';
import AppLanguage from '../../../Contexts/AppLanguage.js';
import Pagination from '../../Pagination';
import '../../../style/adminAllCredits.css';
import AddCredit from './AddCredit';
import CreditsList from './CreditsList';
import Logo from '../../Logo';
export default (props) => {
    const idOfModal = 'editCreditModal';
    const closeModalButton = useRef(null);
    const { appLanguage } = useContext(AppLanguage);
    const { proxy } = useContext(Proxy);
    const [currentCredit, setCurrentCredit] = useState();
    function changeCurrentCredit({ name, min_value, max_value, min_term, max_term, description, percent, id }) {
        if(currentCredit && currentCredit.id === id)
            return
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
    function deleteCredit(removedId) {
        const newArray = props.creditsArray.filter(value => removedId !== value.id);
        props.changeCreditsArray(newArray);
    }
    function addCredit(newCredit) {
        const newArray = props.creditsArray.slice();
        console.log(newCredit);
        newArray.unshift(newCredit)
        props.changeCreditsArray(newArray);
    }
    return (
        <Fade>
            <div className='container-fluid p-0 admin-all-credits-wrapper'>
                <div className='container admin-add-credit'>
                    <div className="jumbotron p-1 p-sm-4 p-lg-5 m-0 rounded-0 bg-transparent">
                        <h2 className='text-center p-sm-3 p-1 m-0 mb-sm-2 admin-add-credit-title title'>{appLanguage === 'eng' ? 'Add credit' : 'Додати кредит'}</h2>
                        <AddCredit onSubmitFunction={addCredit}/>
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
