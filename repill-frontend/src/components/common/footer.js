import React from 'react'
import {
  Container,
  Image,
  List,
  Segment,
} from 'semantic-ui-react'
import styles from './footer.module.css';

function Footer() {
  return (
    <div className={styles.footer}>

      <style>
        {`
          .ui.inverted.header{
            color: #292929
          }
          .ui.inverted.link.list .item, 
          .ui.inverted.link.list .item a:not(.ui), .ui.inverted.link.list a.item{
            color: #292929
          }
          .ui.inverted.segment{
            background: rgba(245,254,192,50%);
            color: #292929;
            height: 100%;
          }
          .ui.primary.inverted.segment{
            color: #292929;
          }
          @media screen and (max-width: 750px) {
            
          }
        `}
      </style>

      <Segment inverted vertical>
        <Container textAlign='center'>
          {/* logo 자리 */}
          <Image src='/logo.png' centered size='mini' />
          <List horizontal inverted divided link size='small'>
            <List.Item as='a' href='#'>
              Email
            </List.Item>
            <List.Item as='a' href='#'>
              Github
            </List.Item>
            <List.Item as='a' href='#'>
              Notion
            </List.Item>
            <List.Item as='a' href='#'>
              Re:pill
            </List.Item>
          </List>
          <br></br>
          Copyright © 2022. All rights reserved.
        </Container>
      </Segment>
    </div>
  )
}

export default Footer
