import React from 'react'
import {
  Container,
  Divider,
  Grid,
  Header,
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
          {/* <Grid columns={4} divided stackable inverted>
            <Grid.Row>
              <Grid.Column>
                <Header inverted as='h4' content='Group 1' />
                <List link inverted>
                  <List.Item as='a'>Link One</List.Item>
                  <List.Item as='a'>Link Two</List.Item>
                  <List.Item as='a'>Link Three</List.Item>
                  <List.Item as='a'>Link Four</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column>
                <Header inverted as='h4' content='Group 2' />
                <List link inverted>
                  <List.Item as='a'>Link One</List.Item>
                  <List.Item as='a'>Link Two</List.Item>
                  <List.Item as='a'>Link Three</List.Item>
                  <List.Item as='a'>Link Four</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column>
                <Header inverted as='h4' content='Group 3' />
                <List link inverted>
                  <List.Item as='a'>Link One</List.Item>
                  <List.Item as='a'>Link Two</List.Item>
                  <List.Item as='a'>Link Three</List.Item>
                  <List.Item as='a'>Link Four</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column>
                <Header inverted as='h4' content='Footer Header' />
                <p>
                  Extra space for a call to action inside the footer that could help re-engage
                  users.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid> */}
          {/* <Divider inverted section /> */}
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
