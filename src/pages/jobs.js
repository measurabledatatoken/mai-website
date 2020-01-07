import React, { useMemo } from "react"
import { css } from "@emotion/core"
import { useTheme } from "emotion-theming"
import { FormattedMessage, useIntl } from "gatsby-plugin-intl"

import Layout from "@/components/layout"
import SEO from "@/components/seo"
import SlopedSection from "@/components/SlopedBackground"
import Hiring from "@/components/HiringSection"
import Job from "@/components/JobSection"

import rawData from "@/data/jobs.json"

const emailStyle = theme => css`
  margin: 0;
  color: ${theme.colors.greens.dark};
  font-size: 2.8rem;
`

const background = theme => css`
  background-image: ${theme.linearGradients.greenDarkToLight};
  margin-bottom: 26.5rem;
`

const hiringPadding = css`
  padding-top: 26.3rem;
  padding-left: 5.7rem;
  text-align: left;
`

const jobsSection = css`
  margin: 0 auto;
  width: 102.4rem;
  padding-left: 6.9rem;
  padding-right: 1.2rem;
  box-sizing: border-box;
`

const HiringSection = () => {
  const intl = useIntl()

  const jobsOpenings = rawData.map(
    rawDataItem => rawDataItem.jobTitle[intl.locale]
  )

  return (
    <Hiring
      css={hiringPadding}
      header={
        <FormattedMessage id="weAreHiring" defaultMessage="We’re HIRING!" />
      }
      description={
        <FormattedMessage
          id="joinUs"
          defaultMessage="Join us in our quest to make communication friendly and efficient! We're looking for full-stack developers to our team in Hong Kong, and we're offering generous equity alongside competitive pay. Not to mention free meals, snacks and drinks, gym room and table tennis, and happy hours!"
        />
      }
      email={
        <FormattedMessage
          id="emailToApply"
          defaultMessage="Email <span>jobs@measurable.ai</span> to apply."
          values={{
            span: str => <span css={emailStyle}>{str}</span>,
          }}
        />
      }
      currentOpenings={
        <FormattedMessage
          id="currentOpenings"
          defaultMessage="Current openings:"
        />
      }
      openingJobs={jobsOpenings}
    />
  )
}

const JobsSection = () => {
  const intl = useIntl()

  const jobData = useMemo(
    () =>
      rawData.map(rawDataItem => {
        const dataItem = {}
        Object.keys(rawDataItem).forEach(key => {
          if (rawDataItem[key].length !== undefined) {
            dataItem[key] = []
            Object.keys(rawDataItem[key]).forEach(sKey => {
              dataItem[key].push(rawDataItem[key][sKey][intl.locale])
            })
          } else {
            dataItem[key] = rawDataItem[key][intl.locale] || rawDataItem[key]
          }
        })
        return dataItem
      }),
    [intl.locale]
  )

  return (
    <div css={jobsSection}>
      {jobData.map((job, index) => (
        <Job
          key={index}
          jobDetails={job}
          description={
            <FormattedMessage
              id="jobDescriptions"
              defaultMessage="Job Descriptions:"
            />
          }
          requirement={
            <FormattedMessage
              id="jobRequirement"
              defaultMessage="Requirement:"
            />
          }
          plus={<FormattedMessage id="jobPlus" defaultMessage="**Plus**" />}
        />
      ))}
    </div>
  )
}

const JobPage = () => {
  const theme = useTheme()
  return (
    <Layout headerMode="light">
      <SEO title="Jobs" />
      <SlopedSection
        css={background}
        slopedBackgroundImage={theme.linearGradients.greenDarkToLight}
      >
        <HiringSection />
      </SlopedSection>
      <JobsSection />
    </Layout>
  )
}

export default JobPage
