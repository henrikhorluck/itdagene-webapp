//@flow
import React from 'react';

import { Section } from '../components/Styled';
import { Image, CenterIt } from '../components/Styled';
import { QueryRenderer, graphql } from 'react-relay';

import { type pages_index_QueryResponse } from './__generated__/pages_index_Query.graphql';
import Collaborators from '../components/Collaborators/Collaborators';
import Companies from '../components/Companies/Companies';
import Flex, { FlexItem } from 'styled-flex-component';
import Link from 'next/link';
import styled from 'styled-components';
import HSP from '../components/Frontpage/HSP';
import WelcomeScreen from '../components/Frontpage/WelcomeScreen';
import withData, { type WithDataProps } from '../lib/withData';
import Layout, { BlueSection } from '../components/Layout';
import PageView from '../components/PageView';

type RenderProps = {
  error: ?Error,
  props: ?pages_index_QueryResponse
};

const ReadMore = styled('h4')``;

const AboutSection = (props: pages_index_QueryResponse) => (
  <>
    <Flex justifyAround wrapReverse>
      <FlexItem grow={1} basis="700px">
        {props.frontpage && <PageView hideDate page={props.frontpage} />}
      </FlexItem>
      <FlexItem>
        <CenterIt>
          <Image
            style={{ width: 350, maxWidth: '100%' }}
            src="static/itdagene-gray2.png"
            alt="itDAGENE logo"
          />
        </CenterIt>
      </FlexItem>
    </Flex>
    <CenterIt text>
      <Link href="/om-itdagene">
        <a>
          <ReadMore>Les mer</ReadMore>
        </a>
      </Link>
    </CenterIt>
  </>
);

const Centered = styled('div')`
  text-align: center;
`;

const EventsSection = ({ query }: { query: pages_index_QueryResponse }) => (
  <>
    <Centered>
      <h1>Hva skjer?</h1>
    </Centered>
    {/* This should be a generic graphql query */}
    <Flex wrap>
      {[query.bankett, query.sommerjobbmaraton, query.stands, query.kurs]
        .filter(Boolean)
        .map(element => (
          <FlexItem key={element.slug} basis={'400px'} grow={1}>
            <h2> {element.title} </h2>
            <p>{element.ingress}</p>
            <Centered>
              <Link href={`/info?side=${element.slug}`}>
                <a>
                  <ReadMore>Les mer</ReadMore>
                </a>
              </Link>
            </Centered>
          </FlexItem>
        ))}
    </Flex>
  </>
);

const Index = ({
  variables,
  query,
  environment,
  queryProps
}: WithDataProps) => (
  <QueryRenderer
    query={query}
    environment={environment}
    dataFrom={'STORE_THEN_NETWORK'}
    variables={variables}
    render={({ props, error }: RenderProps) => {
      return (
        <Layout
          {...{ error, props }}
          contentRenderer={({ props }) => (
            <>
              <BlueSection>
                <WelcomeScreen currentMetaData={props.currentMetaData} />
              </BlueSection>
              <Section>
                <AboutSection {...props} />
              </Section>
              <Section>
                <HSP />
              </Section>
              <Section>
                <Collaborators showDescription query={props} />
              </Section>
              <Section>
                <Companies query={props} />
              </Section>
              <Section style={{ borderBottom: 0 }}>
                <EventsSection query={props} />
              </Section>
            </>
          )}
        />
      );
    }}
  />
);

export default withData(Index, {
  query: graphql`
    query pages_index_Query {
      currentMetaData {
        ...Year_currentMetaData
        ...WelcomeScreen_currentMetaData
        id
      }
      ...Companies_query
      ...Collaborators_query

      frontpage: page(slug: "frontpage") {
        ...PageView_page
      }

      bankett: page(slug: "bankett") {
        title
        slug
        ingress
      }
      sommerjobbmaraton: page(slug: "sommerjobbmaraton") {
        title
        slug
        ingress
      }
      stands: page(slug: "stands") {
        title
        slug
        ingress
      }
      kurs: page(slug: "kurs") {
        title
        slug
        ingress
      }
    }
  `,
  variables: {}
});
