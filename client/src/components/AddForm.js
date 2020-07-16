import React,{useState, setIsOpen } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import "../styles/modal.scss";
import Modal from 'react-modal';
import { Controller, useForm } from "react-hook-form";
import { TextArea , TextInput } from '@thumbtack/thumbprint-react';

const customStyles = {
  content : {
    top                   : '30%',
    left                  : '35%',
    right                 : '5%',
    bottom                : '8%',
  }
};

function AddForm() {
  var subtitle;
  const [GeneralIsOpen, setGeneralIsOpen] = React.useState(false);
  const [GithubIsOpen, setGithubIsOpen] = React.useState(false);
  const [GithubPRIsOpen, setGithubPRIsOpen] = React.useState(false);
  const [value,setValue]=useState('');
  const handleSelect=(e)=>{
    console.log(e);
    setValue(e)
  }

  /*
  openModal function for 5 diferrent types of models
  */
  function openGeneralModal() {
    setGeneralIsOpen(true);
  }

  function openGithubModal() {
    setGithubIsOpen(true);
  }

  function openGithubPRModal() {
    setGithubPRIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#2D2D2D';
  }


  /*
  closeModal function for 5 diferrent types of models
  */
  function closeGeneralModal(){
    setGeneralIsOpen(false);
  }

  function closeGithubModal(){
    setGithubIsOpen(false);
  }

  function closeGithubPRModal(){
    setGithubPRIsOpen(false);
  }

  const { handleSubmit, register, errors } = useForm();

  /*
  Define states for each modal's contents
  */
  const [textGeneralTitle, settextGeneralTitle] = React.useState('');
  const [textGeneralBody, settextGeneralBody] = React.useState('');

  const [textGithubTitle, settextGithubTitle] = React.useState('');
  const [textGithubBody, settextGithubBody] = React.useState('');

  const [textGithubPRTitle, settextGithubPRTitle] = React.useState('');
  const [textGithubPRBody, settextGithubPRBody] = React.useState('');


  const onSubmitGeneral = () => {
    console.log(textGeneralTitle);
  };

  const onSubmitGithub= () => {
    console.log(textGeneralTitle);
  };

  const onSubmitGithubPR = () => {
    console.log(textGeneralTitle);
  };


  return (    
    <div class="is-stuckToBottom">
      <DropdownButton
      title="+ Add Post"
      key = 'up'
      id="dropdown-menu-align-up"
      drop = {'up'}
      onSelect={handleSelect}
        >
              <Dropdown.Item onClick={openGeneralModal} eventKey="option-1">General</Dropdown.Item>
              <Modal
                isOpen={GeneralIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeGeneralModal}
                style={customStyles}
                contentLabel="General Post Form" >
                <h2 ref={_subtitle => (subtitle = _subtitle)}>Add Post</h2>
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                <form>
                <label>Title of your post</label>
                <TextInput
                    size="small"
                    value={textGeneralBody}
                    placeholder="e.g. How to hack"
                    onChange={v => settextGeneralBody(v)}
                  
                />

                <label>Describe your post</label>
                <TextArea
                    placeholder="Post description"
                    onChange={v => settextGeneralTitle(v)}
                    value={textGeneralTitle}
                />

                {/* <button type="submit">Submit</button> */}
                <button onClick={handleSubmit(onSubmitGeneral)}>Submit</button>
                <button onClick={closeGeneralModal}>close</button>

                </form>
              </Modal>

              <Dropdown.Item onClick={openGithubModal} eventKey="option-2">Github Issue</Dropdown.Item>
              <Modal
                isOpen={GithubIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeGithubModal}
                style={customStyles}
                contentLabel="Github Post Form" >
                <h2 ref={_subtitle => (subtitle = _subtitle)}>Add Post</h2>
                <form>

                <label>Title of your post</label>
                <TextInput
                    size="small"
                    value={textGithubTitle}
                    placeholder="example@example.com"
                    onChange={v => settextGithubTitle(v)}
                />

                <label>Describe your post</label>
                <TextArea
                    placeholder="Post description"
                    onChange={v => settextGithubBody(v)}
                    value={textGithubBody}
                />
                <button onClick={handleSubmit(onSubmitGithub)}>Submit</button>
                <button onClick={closeGithubModal}>close</button>

                </form>
              </Modal>

              <Dropdown.Item eventKey="option-3">Github PR</Dropdown.Item>
              <Modal
                isOpen={GithubPRIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeGithubPRModal}
                style={customStyles}
                contentLabel="Github Post Form" >
                <h2 ref={_subtitle => (subtitle = _subtitle)}>Add Post</h2>
                <form>

                <label>Title of your post</label>
                <TextInput
                    size="small"
                    value={textGithubPRTitle}
                    placeholder="example@example.com"
                    onChange={v => settextGithubPRTitle(v)}
                />

                <label>Describe your post</label>
                <TextArea
                    placeholder="Post description"
                    onChange={v => settextGithubPRBody(v)}
                    value={textGithubPRBody}
                />
                <button onClick={handleSubmit(onSubmitGithubPR)}>Submit</button>
                <button onClick={closeGithubPRModal}>close</button>

                </form>
              </Modal>

      </DropdownButton>

      </div>
  );
}

export default AddForm;
