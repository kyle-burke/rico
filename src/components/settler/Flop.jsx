import * as React from 'react';
import { connect } from 'react-redux';
import Crop from './Crop';
import actions from '../../actions';

let Flop = ({
  flop,
  onCropClick,
  settlerPhase
}) => {
  return (
    <div>
      <h2>Crop Flop</h2>
      {
        flop.map((crop, index) => {
          return (
            <Crop
              key={index}
              crop={crop}
              flopIndex={index}
              onClick={onCropClick}
              disabled={!settlerPhase}
            />
          )
        })
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    flop: state.crops.flop,
    settlerPhase: state.activeJob === 'settler'
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCropClick: (crop, flopIndex) => {
      dispatch(actions.takeFromFlop(flopIndex));

      dispatch(actions.addCrop(crop));

      dispatch(actions.handleEndOfTurn());
    }
  };
};

Flop = connect(
  mapStateToProps,
  mapDispatchToProps
)(Flop);

export default Flop;

