import React, { useEffect, useContext, useState, useRef } from 'react';
import Proxy from '../../../Contexts/Proxy.js';
import AppLanguage from '../../../Contexts/AppLanguage.js';
import { CSSTransitionGroup } from 'react-transition-group'

import { useAlert } from 'react-alert';
import '../../../style/adminCreditsList.css';
export default (props) => {
    const maxValueForNumberInput = 9;
    const { appLanguage } = useContext(AppLanguage);
    const { proxy } = useContext(Proxy);
    const alert = useAlert();
    const creditsArray = props.creditsArray;
    return (
        <div className='container-fluid p-0 admin-credits-list-wrapper'>
            <div className='container p-0 admin-credits-list table-responsive-md'>
                <table className='table  table-striped table-hover'>
                    <thead >
                        <tr>
                            <th rowSpan='2' className='name'>{appLanguage === 'eng' ? 'Name' : 'Назва'}</th>
                            <th>{appLanguage === 'eng' ? 'Min val' : 'Мін знач'}</th>
                            <th>{appLanguage === 'eng' ? 'Max val' : 'Макс знач'}</th>
                            <th>{appLanguage === 'eng' ? 'Min term' : 'Мін терм'}</th>
                            <th>{appLanguage === 'eng' ? 'Max term' : 'Макс терм'}</th>
                            <th rowSpan='2'>{appLanguage === 'eng' ? 'Percent' : 'Відсоток'}</th>
                            <th rowSpan='2' className='description'>{appLanguage === 'eng' ? 'Description' : 'Опис'}</th>
                            <th rowSpan='2'>{appLanguage === 'eng' ? 'Controller' : 'Контролер'}</th>
                        </tr>
                        <tr className='units'>
                            <th colSpan='2'>{appLanguage === 'eng' ? 'grn' : 'грн'}</th>
                            <th colSpan='2'>{appLanguage === 'eng' ? 'days' : 'днів'}</th>
                        </tr>
                    </thead>

                    <tbody>
                        <CSSTransitionGroup
                            component={React.Fragment}
                            transitionName="example"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={300}
                        >
                            {creditsArray.length > 0 ?
                                creditsArray.map(credit =>
                                    <tr key={credit.id}>
                                        <td>{credit.name}</td>
                                        <td>{credit.min_value}</td>
                                        <td>{credit.max_value}</td>
                                        <td>{credit.min_term}</td>
                                        <td>{credit.max_term}</td>
                                        <td>{credit.percent}</td>
                                        <td className='text-left'>{credit.description}</td>
                                        <td>
                                            <div className='controller'>
                                                <button onClick={() => props.changeCurrentCredit(credit)} data-target={'#' + props.idOfModal} data-toggle='modal' className='btn btn-primary'>
                                                    {appLanguage === 'eng' ? 'Edit' : 'Змінити'}
                                                </button>
                                                <button onClick={() => props.deleteCredit(credit.id)} className='btn btn-danger'>
                                                    {appLanguage === 'eng' ? 'Delete' : 'Видалити'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ) :
                                <tr className='no-items-message'><td colSpan='8'><h2 className='message'>{appLanguage === 'eng' ? 'There is no items' : "Тут немає об'єктів"}</h2></td></tr>
                            }
                        </CSSTransitionGroup>
                    </tbody>

                </table>
            </div>
        </div >
    )
}
