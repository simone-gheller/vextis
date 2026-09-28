import { Link, useOutletContext } from 'react-router-dom';
import { FONTS } from '@vextis/ui';
import { APP_URL } from '../constants.js';
import { PageTitle } from '../components/content/PageTitle.jsx';
import { Callout } from '../components/content/Callout.jsx';
import { CommandBlock } from '../components/content/CommandBlock.jsx';
import { OutputBlock } from '../components/content/OutputBlock.jsx';
import { Table } from '../components/content/Table.jsx';

const paragraphStyle = (T) => ({
  fontFamily: FONTS.display,
  fontSize: '13px',
  color: T.textSecondary,
  lineHeight: 1.7,
});

function Step({ T, number, title, children }) {
  return (
    <section className="step-row" style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: '6px', padding: '16px', display: 'grid', gridTemplateColumns: '38px minmax(0, 1fr)', gap: '14px' }}>
      <div style={{ fontFamily: FONTS.mono, color: T.termGreen, fontSize: '12px' }}>{String(number).padStart(2, '0')}</div>
      <div style={{ display: 'grid', gap: '12px', minWidth: 0 }}>
        <h2 id={`step-${number}`} style={{ fontFamily: FONTS.display, fontSize: '17px', color: T.textPrimary, scrollMarginTop: '78px' }}>{title}</h2>
        {children}
      </div>
    </section>
  );
}

export default function QuickstartPage() {
  const { T } = useOutletContext();

  return (
    <>
      <PageTitle T={T} label="getting started" title="Quickstart">
        Create one parameter in the dashboard, set its development value from the CLI, and inject it into a child process.
      </PageTitle>

      <div style={{ display: 'grid', gap: '16px' }}>
        <Callout T={T} type="warning">
          This guide assumes the <code>vextis</code> command is already installed. The repository installer still targets the former release repository, so no public install command is included here. Confirm your installed build with <code>vextis version</code>.
        </Callout>

        <Step T={T} number={1} title="Create an account">
          <p style={paragraphStyle(T)}>
            Open <a href={`${APP_URL}/signup`} style={{ color: T.termGreen }}>Sign up</a>. Enter <strong style={{ color: T.textPrimary }}>Ada Lovelace</strong> as the display name, use an email inbox you can access, and name the organization <strong style={{ color: T.textPrimary }}>Acme</strong>. After submitting the form, enter the six-digit verification code sent by email.
          </p>
          <p style={paragraphStyle(T)}>Google sign-in is also available, but the rest of this guide follows the email and password flow.</p>
        </Step>

        <Step T={T} number={2} title="Create the app">
          <p style={paragraphStyle(T)}>In the dashboard, open <strong style={{ color: T.textPrimary }}>Apps</strong>, select <strong style={{ color: T.textPrimary }}>+ new app</strong>, and use:</p>
          <Table T={T} rows={[
            ['Name', 'api'],
            ['Parent app', 'None'],
          ]} firstColumnWidth="150px" />
        </Step>

        <Step T={T} number={3} title="Create the environment">
          <p style={paragraphStyle(T)}>Open <strong style={{ color: T.textPrimary }}>Environments</strong>, select <strong style={{ color: T.textPrimary }}>+ new environment</strong>, and use:</p>
          <Table T={T} rows={[
            ['Name', 'development'],
            ['Tier', 'development'],
            ['Protected', 'Off'],
          ]} firstColumnWidth="150px" />
        </Step>

        <Step T={T} number={4} title="Create the parameter">
          <p style={paragraphStyle(T)}>Open <strong style={{ color: T.textPrimary }}>Parameters</strong>, select the <code>api</code> app, and create:</p>
          <Table T={T} rows={[
            ['Key', 'DATABASE_URL'],
            ['Description', 'Local database connection string'],
            ['Default value', 'Leave empty'],
          ]} firstColumnWidth="150px" />
        </Step>

        <Step T={T} number={5} title="Authenticate and link this directory">
          <p style={paragraphStyle(T)}>Run these commands from the directory that contains your application:</p>
          <CommandBlock T={T} command={'vextis auth login\nvextis link --app api --env development'} />
          <p style={paragraphStyle(T)}>
            Login opens a browser authorization page. Approve the Acme organization, then return to the terminal. Linking writes the app and environment names to <code>.vextis/config.json</code> in the current directory.
          </p>
        </Step>

        <Step T={T} number={6} title="Set the development value">
          <CommandBlock T={T} command={'vextis params set DATABASE_URL --app api --env development --value "postgres://localhost:5432/app"'} />
          <Callout T={T}>
            <code>params set</code> updates an existing parameter. In the beta workflow, create new parameters in the dashboard first.
          </Callout>
        </Step>

        <Step T={T} number={7} title="Run a process with the resolved config">
          <CommandBlock T={T} command={'vextis run -- node -e "console.log(process.env.DATABASE_URL)"'} />
          <OutputBlock T={T}>postgres://localhost:5432/app</OutputBlock>
          <p style={paragraphStyle(T)}>
            Vextis fetches the resolved configuration for <code>api</code> in <code>development</code>, adds each value to the child process environment, and starts Node.js.
          </p>
        </Step>

        <Callout T={T}>
          Next, read <Link to="/docs/core-concepts" style={{ color: T.termGreen }}>Core concepts</Link> to understand how the same key resolves across parent apps and environments. Return to the <Link to="/docs" style={{ color: T.termGreen }}>Introduction</Link> for the beta product boundary.
        </Callout>
      </div>
    </>
  );
}
