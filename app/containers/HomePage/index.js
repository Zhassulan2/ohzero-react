/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import A from 'components/A';
import Img from 'components/Img';
import Banner from './jeans3.jpg';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'home';

export function HomePage({
  username,
  loading,
  error,
  repos,
  onSubmitForm,
  onChangeUsername,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (username && username.trim().length > 0) onSubmitForm();
  }, []);

  const reposListProps = {
    loading,
    error,
    repos,
  };
  const widthPercent = '100%';

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="baseus, baseus официальный сайт, xiaomi, xiaomi официальный сайт"
        />
        <meta
          name="keywords"
          content="baseus, baseus официальный сайт, xiaomi, xiaomi официальный сайт"
        />
      </Helmet>
      <div>
        <CenteredSection>
          <div className="w3-container">
            <p>
              Washed Skinny Jeans
              <br />
              <b>$20.50</b>
            </p>
          </div>
          <div className="w3-container w3-text-grey" id="jeans">
            <p>8 items</p>
          </div>
          <H2>
            <FormattedMessage {...messages.startProjectHeader} />
          </H2>
          <p>
            <FormattedMessage {...messages.startProjectMessage} />
          </p>
        </CenteredSection>
        <Section>
          <H2>
            <FormattedMessage {...messages.trymeHeader} />
          </H2>
          <A href="https://wa.me/7774449731?text=ГлавнаяКартина">
            <Img src={Banner} alt="react-boilerplate - Logo" />
          </A>
          <div className="w3-row w3-grayscale">
            <div className="w3-col l3 s6">
              <div className="w3-container">
                <Img
                  src={Banner}
                  alt="react-boilerplate - Logo"
                  style={{ width: widthPercent }}
                />
                <p>
                  Ripped Skinny Jeans
                  <br />
                  <b>$24.99</b>
                </p>
              </div>
              <div className="w3-container">
                <Img
                  src={Banner}
                  alt="react-boilerplate - Logo"
                  style={{ width: widthPercent }}
                />
                <p>
                  Mega Ripped Jeans
                  <br />
                  <b>$19.99</b>
                </p>
              </div>
            </div>
            <div className="w3-col l3 s6">
              <div className="w3-container">
                <div className="w3-display-container">
                  <Img
                    src={Banner}
                    alt="react-boilerplate - Logo"
                    style={{ width: widthPercent }}
                  />
                </div>
                <p>
                  Mega Ripped Jeans
                  <br />
                  <b>$19.99</b>
                </p>
              </div>
              <div className="w3-container">
                <Img
                  src={Banner}
                  alt="react-boilerplate - Logo"
                  style={{ width: widthPercent }}
                />
                <p>
                  Washed Skinny Jeans
                  <br />
                  <b>$20.50</b>
                </p>
              </div>
            </div>

            <div className="w3-col l3 s6">
              <div className="w3-container">
                <Img
                  src={Banner}
                  alt="react-boilerplate - Logo"
                  style={{ width: widthPercent }}
                />
                <p>
                  Washed Skinny Jeans
                  <br />
                  <b>$20.50</b>
                </p>
              </div>
              <div className="w3-container">
                <div className="w3-display-container">
                  <Img
                    src={Banner}
                    alt="react-boilerplate - Logo"
                    style={{ width: widthPercent }}
                  />
                </div>
                <p>
                  Vintage Skinny Jeans
                  <br />
                  <b className="w3-text-red">$14.99</b>
                </p>
              </div>
            </div>

            <div className="w3-col l3 s6">
              <div className="w3-container">
                <Img
                  src={Banner}
                  alt="react-boilerplate - Logo"
                  style={{ width: widthPercent }}
                />
                <p>
                  Vintage Skinny Jeans
                  <br />
                  <b>$14.99</b>
                </p>
              </div>
              <div className="w3-container">
                <Img
                  src={Banner}
                  alt="react-boilerplate - Logo"
                  style={{ width: widthPercent }}
                />
                <p>
                  Ripped Skinny Jeans
                  <br />
                  <b>$24.99</b>
                </p>
              </div>
            </div>
          </div>
          <Form onSubmit={onSubmitForm}>
            <label htmlFor="username">
              <FormattedMessage {...messages.trymeMessage} />
              <AtPrefix>
                <FormattedMessage {...messages.trymeAtPrefix} />
              </AtPrefix>
              <Input
                id="username"
                type="text"
                placeholder="mxstbr"
                value={username}
                onChange={onChangeUsername}
              />
            </label>
          </Form>
          <ReposList {...reposListProps} />
        </Section>
      </div>
    </article>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
