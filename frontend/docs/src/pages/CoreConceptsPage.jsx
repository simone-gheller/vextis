import { Link, useOutletContext } from 'react-router-dom';
import { FONTS } from '@vextis/ui';
import { PageTitle } from '../components/content/PageTitle.jsx';
import { Callout } from '../components/content/Callout.jsx';
import { SmallHeading } from '../components/content/SmallHeading.jsx';
import { Table } from '../components/content/Table.jsx';

const paragraphStyle = (T) => ({
  fontFamily: FONTS.display,
  fontSize: '13px',
  color: T.textSecondary,
  lineHeight: 1.75,
});

function ConceptDiagram({ T }) {
  const panelStyle = {
    background: T.bg,
    border: `1px solid ${T.border}`,
    borderRadius: '5px',
    padding: '14px',
    fontFamily: FONTS.mono,
    fontSize: '12px',
    color: T.textSecondary,
    lineHeight: 1.8,
  };

  return (
    <figure style={{ margin: 0 }}>
      <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: '6px', padding: '16px' }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: '12px', color: T.termGreen, marginBottom: '12px' }}>Acme</div>
        <div className="card-grid">
          <div style={panelStyle}>
            <div style={{ color: T.textMuted }}>apps</div>
            <div>└─ platform</div>
            <div style={{ color: T.termGreen }}>   ├─ LOG_LEVEL</div>
            <div>   └─ api</div>
          </div>
          <div style={panelStyle}>
            <div style={{ color: T.textMuted }}>environments</div>
            <div>├─ development</div>
            <div>└─ production</div>
          </div>
        </div>
      </div>
      <figcaption style={{ fontFamily: FONTS.mono, fontSize: '11px', color: T.textMuted, marginTop: '8px', textAlign: 'center' }}>
        Environments belong to Acme and apply across its app tree.
      </figcaption>
    </figure>
  );
}

export default function CoreConceptsPage() {
  const { T } = useOutletContext();

  return (
    <>
      <PageTitle T={T} label="getting started" title="Core concepts">
        Understand where configuration is defined, what changes by environment, and how Vextis chooses an effective value.
      </PageTitle>

      <div style={{ display: 'grid', gap: '28px' }}>
        <ConceptDiagram T={T} />

        <section>
          <SmallHeading T={T} id="organizations">Organizations</SmallHeading>
          <p style={paragraphStyle(T)}>
            An organization is the ownership and access boundary. Acme owns its apps, environments, members, roles, and tokens. A user can belong to more than one organization, but each request operates in one organization context.
          </p>
        </section>

        <section>
          <SmallHeading T={T} id="apps">Apps and hierarchy</SmallHeading>
          <p style={paragraphStyle(T)}>
            An app is a configuration namespace for a service or other runnable component. Apps can be nested. In the example, <code>platform</code> is the parent of <code>api</code>, so <code>api</code> can inherit parameters and values from <code>platform</code>.
          </p>
        </section>

        <section>
          <SmallHeading T={T} id="environments">Environments</SmallHeading>
          <p style={paragraphStyle(T)}>
            Environments belong to the organization, not to an individual app. Acme can use the same <code>development</code> and <code>production</code> environments across both <code>platform</code> and <code>api</code>. An environment can also be marked protected, which changes the permission required to reveal or write its values.
          </p>
        </section>

        <section>
          <SmallHeading T={T} id="parameters-and-values">Parameters and values</SmallHeading>
          <p style={paragraphStyle(T)}>
            A parameter is a named key defined on an app. Here, <code>LOG_LEVEL</code> is defined on <code>platform</code>. Its development and production values are separate value records, so changing one environment does not change the other.
          </p>
          <p style={{ ...paragraphStyle(T), marginTop: '10px' }}>
            Creating a parameter creates an unset value record for every existing organization environment. Creating an environment does the inverse: it creates an unset value record for every existing parameter in the organization.
          </p>
        </section>

        <section>
          <SmallHeading T={T} id="resolved-config">Resolved config</SmallHeading>
          <p style={{ ...paragraphStyle(T), marginBottom: '14px' }}>
            Resolved config is the effective key/value map for one app and one environment. For each key, Vextis starts at the selected app and uses the nearest value in its ancestor chain that is set. A local parameter with the same key is an override; if its local value is unset, resolution can still fall back to a set ancestor value.
          </p>
          <Table T={T} rows={[
            ['set', 'The selected app provides the effective value for this environment.'],
            ['inherited', 'A parent app provides the effective value because no closer app has a set value.'],
            ['unset', 'No app in the selected app\'s ancestor chain has a set value for this environment.'],
            ['redacted', 'An effective value exists, but the current user or token cannot reveal it.'],
          ]} firstColumnWidth="130px" />
        </section>

        <section>
          <SmallHeading T={T} id="access">Roles and tokens</SmallHeading>
          <p style={paragraphStyle(T)}>
            Organization roles determine what a signed-in user can read, reveal, or change. Tokens carry scopes and can also be restricted to one app or environment. A redacted value is therefore different from an unset value: redacted means a value exists but is not available to the current caller.
          </p>
        </section>

        <Callout T={T}>
          Put the model into practice in the <Link to="/docs/quickstart" style={{ color: T.termGreen }}>Quickstart</Link>, or return to the <Link to="/docs" style={{ color: T.termGreen }}>Introduction</Link>.
        </Callout>
      </div>
    </>
  );
}
