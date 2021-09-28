import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { PrimaryButton, DefaultButton, TeachingBubble, DirectionalHint } from '@fluentui/react/lib';

// Also available from @uifabric/icons (7 and earlier) and @fluentui/font-icons-mdl2 (8+)
import { initializeIcons } from '@fluentui/react/lib/Icons';
import styles from './styles.scss';


const Root: React.FC = () => {
  const [showBubble, setShowBubble] = useState(false);


  const displayBubble = () => { setShowBubble(true); console.log(showBubble); };
  const hideBubble = () => setShowBubble(false);


  const bubble = (
    <TeachingBubble 
      headline='PLEASE READ'
      calloutProps={{directionalHint: DirectionalHint.bottomCenter}} 
      target='#like-button'
      isWide={true}
      hasCloseButton={true}
      onDismiss={hideBubble}>
        This is a bubble for teaching
    </TeachingBubble>);

  return (
    <div className={styles.Root}>
      <h1>Viewr</h1> 
      <p>{showBubble ? 'show' : 'hide'}</p>
      <DefaultButton text='Like' id='like-button'/>
      <PrimaryButton text='Subscribe' onClick={displayBubble}/>

      {showBubble && bubble}
    </div>
  );
}

initializeIcons(/* optional base url */);
ReactDOM.render(
  < Root />,
  document.getElementById('app')
);