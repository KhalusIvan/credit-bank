import React, {useState, useContext, useRef} from 'react';
import AbsoluteBtn from './AbsoluteBtn.js';
import '../../style/signForm.css';
import Logo from '../Logo.js';
import InstructionSwitcher from './Instruction/InstructionSwitcher.js';
import AppLanguage from '../../Contexts/AppLanguage.js';
import SignUpForm from './SignUpForm.js';
import SignInForm from './SignInForm.js';
export default (props) => {
    const [active, setActive] = useState('left');
    function toggleActive(e) {
        e.target.classList.contains('first-variant') ? setActive('left') : setActive('right');
    }
    const closeModalButton = useRef(null);
    function closeModal() {
        if(closeModalButton.current)
            closeModalButton.current.click();
        return;
    }
    const appLanguage = useContext(AppLanguage).appLanguage;
    return (
        <>
            <AbsoluteBtn btnClass='sign-btn  btn-secondary pt-2 pb-2' btnText={appLanguage === 'eng' ? 'Sigh in/Sign out' : 'Вхід / Регістрація'} dataToggle='modal' dataTarget='#signin' />
            <div className="modal fade signForm " id="signin" tabIndex="-1" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <Logo/>
                            <button ref={closeModalButton} type="button" className="close p-0 mt-1" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <InstructionSwitcher active={active} toggleFunction={toggleActive} classSwitcher='instruction-switcher text-center mt-3 mb-3' firstVariant={appLanguage === 'eng' ? 'Sign Up' :'Реєстація'} secondVariant={appLanguage === 'eng' ? 'Sign In' :'Вхід'} />
                        {active === 'left' ? <SignUpForm onSubmitFunction={closeModal}/> : <SignInForm onSubmitFunction={closeModal}/>}
                    </div>
                </div>
            </div>
        </>
    )
}