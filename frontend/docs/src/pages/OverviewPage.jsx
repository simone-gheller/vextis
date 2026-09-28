import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { FONTS } from '@vextis/ui';
import { PageTitle } from '../components/content/PageTitle.jsx';
import { Callout } from '../components/content/Callout.jsx';
import { DocCard } from '../components/content/DocCard.jsx';
import { SmallHeading } from '../components/content/SmallHeading.jsx';
import { Table } from '../components/content/Table.jsx';

const paragraphStyle = (T) => ({
  fontFamily: FONTS.display,
  fontSize: '13px',
  color: T.textSecondary,
  lineHeight: 1.75,
});

export default function OverviewPage() {
  const { T } = useOutletContext();
  const navigate = useNavigate();

  return (
    <>
      <PageTitle T={T} label="getting started" title="Introduction">
        Vextis keeps application configuration in one organization-level workspace, then makes the resolved values available to local processes through the CLI.
      </PageTitle>

      <div style={{ display: 'grid', gap: '28px' }}>
        <section>
          <SmallHeading T={T} id="what-vextis-manages">What Vextis manages</SmallHeading>
          <p style={paragraphStyle(T)}>
            Use the dashboard to organize apps, create environments, and define parameters. Each parameter can have a different value in each environment. Values are encrypted at rest, and child apps can inherit configuration from parent apps.
          </p>
        </section>

        <section>
          <SmallHeading T={T} id="supported-beta-workflow">Supported beta workflow</SmallHeading>
          <div className="card-grid">
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: '6px', padding: '16px' }}>
              <h3 style={{ fontFamily: FONTS.display, fontSize: '15px', color: T.textPrimary, marginBottom: '7px' }}>Dashboard</h3>
              <p style={paragraphStyle(T)}>Create the organization model: apps, environments, parameters, and environment-specific values.</p>
            </div>
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: '6px', padding: '16px' }}>
              <h3 style={{ fontFamily: FONTS.display, fontSize: '15px', color: T.textPrimary, marginBottom: '7px' }}>CLI</h3>
              <p style={paragraphStyle(T)}>Authenticate in a browser, link a local directory, update existing parameters, and run a process with resolved config.</p>
            </div>
          </div>
        </section>

        <section>
          <SmallHeading T={T} id="a-small-example">A small example</SmallHeading>
          <Table T={T} rows={[
            ['Organization', 'Acme'],
            ['App', 'api'],
            ['Environments', 'development and production'],
            ['Parameter', 'DATABASE_URL'],
            ['Values', 'One DATABASE_URL value for development and another for production'],
          ]} firstColumnWidth="150px" />
          <p style={{ ...paragraphStyle(T), marginTop: '14px' }}>
            When the <code>api</code> app runs in <code>development</code>, Vextis resolves the development value. The same app resolves the production value when production is selected.
          </p>
        </section>

        <Callout T={T} type="warning">
          This beta guide covers dashboard setup and local CLI consumption. It does not establish a public support contract for the raw API, Node SDK, live updates, SSO, or billing automation.
        </Callout>

        <section>
          <SmallHeading T={T} id="where-to-start">Where to start</SmallHeading>
          <div className="card-grid">
            <DocCard T={T} title="Quickstart" body="Create Acme/api and inject DATABASE_URL into a local Node.js process." onClick={() => navigate('/docs/quickstart')} />
            <DocCard T={T} title="Core concepts" body="Understand organizations, apps, environments, values, and inheritance." onClick={() => navigate('/docs/core-concepts')} />
          </div>
          <p style={{ ...paragraphStyle(T), marginTop: '14px' }}>
            Already setting up the example? Continue with the <Link to="/docs/quickstart" style={{ color: T.termGreen }}>Quickstart</Link>.
          </p>
        </section>
      </div>
    </>
  );
}
