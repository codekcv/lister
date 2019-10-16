import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCog } from 'react-icons/fa';
import { changeBackgroundColor } from '../../store/board/actions';
import { connect } from 'react-redux';

interface Props {
  changeBackgroundColor: typeof changeBackgroundColor;
}

const Options: React.FC<Props> = ({ changeBackgroundColor }) => {
  const [show, setShow] = useState(false);

  const handleOnClick = () => {
    setShow(show => !show);
  };

  const handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleChangeColor = (color: string) => {
    changeBackgroundColor(color);
  };

  return (
    <Container>
      <div className="nav-button options" onClick={handleOnClick}>
        <FaCog />
      </div>

      {show && (
        <>
          <div className="modal-background" onClick={handleOnClick} />
          <div className="modal-box">
            <h1 className="title">listerNote</h1>{' '}
            <span>
              <b>v1.0.0</b>
            </span>
            <p>
              This is a React app for organizing notes. It is based on Trello.
            </p>
            <p>I am building this for practice. Will add back-end soon.</p>
            <br />
            <h2>Choose Your Background Color:</h2>
            <br />
            <ul className="color-ul">
              <li>
                <ColorPicker
                  className="color-pick"
                  onClick={() => handleChangeColor('MediumSeaGreen')}
                  color="MediumSeaGreen"
                ></ColorPicker>
              </li>
              <li>
                <ColorPicker
                  className="color-pick"
                  onClick={() => handleChangeColor('CornflowerBlue')}
                  color="CornflowerBlue"
                ></ColorPicker>
              </li>
              <li>
                <ColorPicker
                  className="color-pick"
                  onClick={() => handleChangeColor('Brown')}
                  color="Brown"
                ></ColorPicker>
              </li>

              <li>
                <ColorPicker
                  className="color-pick"
                  onClick={() => handleChangeColor('DarkKhaki')}
                  color="DarkKhaki"
                ></ColorPicker>
              </li>
              <li>
                <ColorPicker
                  className="color-pick"
                  onClick={() => handleChangeColor('Coral')}
                  color="Coral"
                ></ColorPicker>
              </li>
            </ul>
            <br />
            <ul className="last-options">
              <li onClick={handleOnClick}>Go back</li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/villamin_c"
                >
                  @villamin_c
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/ChristianVillamin/lister"
                >
                  GitHub Source Code
                </a>
              </li>
            </ul>
            <br />
            <hr />
            <br />
            <div className="nav-button reset-button" onClick={handleReset}>
              Clear Local Storage
            </div>
            <br />
          </div>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  .modal-background {
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .modal-box {
    position: fixed;
    background: white;
    padding: 8px;
    width: 600px;
    height: auto;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 3px;
    box-shadow: 0 0 5px gray;

    .title {
      display: inline-block;
    }

    .color-ul {
      display: flex;
    }

    .last-options {
      display: flex;
      justify-content: flex-start;
      margin-right: 20px;
      padding-top: 20px;
      margin-bottom: 10px;

      li {
        text-decoration: none;
        margin-right: 30px;
        padding: 4px 12px;
        border: 1px solid darkgray;
        border-radius: 3px;
        box-shadow: 0 1px gray;

        :hover {
          cursor: pointer;
          box-shadow: none;
          offset-position: 12px;
          background: lightgray;
        }
      }
    }
  }
`;

const ColorPicker = styled.div<{ color: string }>`
  background: ${props => props.color};
  width: 40px;
  height: 40px;
  border: 1px gray solid;
  margin: 0 5px;
`;

export default connect(
  null,
  { changeBackgroundColor }
)(Options);
