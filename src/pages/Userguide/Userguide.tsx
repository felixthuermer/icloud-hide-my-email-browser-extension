import React from 'react';
import { TitledComponent, Link } from '../../commonComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faWarning } from '@fortawesome/free-solid-svg-icons';
import { isFirefox } from '../../browserUtils';

const Notice = (props: {
  title: string;
  children: React.ReactNode;
  isAlert?: boolean;
}) => {
  const { title, children, isAlert = false } = props;

  const colourPalette = isAlert
    ? 'bg-yellow-50 border-yellow-400 text-yellow-600'
    : 'text-gray-600 bg-gray-50';

  return (
    <div
      className={`flex p-3 text-sm border rounded-lg ${colourPalette}`}
      role={isAlert ? 'alert' : 'info'}
    >
      <FontAwesomeIcon
        icon={isAlert ? faWarning : faInfoCircle}
        className="mr-2 mt-1"
      />
      <span className="sr-only">Info</span>
      <div className="space-y-1">
        <p className="font-semibold">{title}</p>
        {children}
      </div>
    </div>
  );
};

const SignInInstructions = () => {
  return (
    <div className="space-y-4">
      <div>
        <p>
          To setup this extension, you need to sign-in to your iCloud account
          from within the browser. Navigate to{' '}
          <Link
            href="https://icloud.com"
            className="font-semibold"
            aria-label="Go to iCloud.com"
          >
            icloud.com
          </Link>{' '}
          and complete the full sign-in process, including the{' '}
          <span className="font-semibold">two-factor authentication</span> and{' '}
          <span className="font-semibold">Trust This Browser</span> steps.
        </p>
        <div className="text-center">
          <img
            src="./icloud-sign-in.webp"
            alt="Screenshots of the icloud.com sign-in flow"
          />
        </div>
        <p>
          Once you&apos;re signed-in to your account you&apos;re set to go. Open
          the extension pop-up (🍏 icon) to generate a new{' '}
          <span className="font-semibold">HideMyEmail</span> address! ✨
        </p>
      </div>
      {isFirefox && (
        <Notice title="Using Firefox Multi-Account Containers?" isAlert>
          <p>
            The extension won&apos;t work if you log-in to icloud.com from a tab
            within a container. Instead, you need to log-in from a{' '}
            <i>default</i> tab that is not part of any container. Once logged
            in, the extension will work in any tab, whether it&apos;s part of a
            container or not.
          </p>
        </Notice>
      )}
      <Notice title="Already signed-in?">
        <p>No further action needed. The extension is ready to use!</p>
      </Notice>
      <Notice title='Do I have to ✅ the "Keep me signed in" box?'>
        <p>
          This is not necessary. You may also choose to not trust this browser
          in the relevant step of the sign-in flow. The extension will work
          regardless. However, by opting to remain signed in, you ensure that
          the extension will also remain signed in, which will save you from
          frequently repeating the sign-in process. Hence, even though not
          necessary,{' '}
          <span className="font-semibold">
            it&apos;s strongly recommended to tick the &quot;Keep me signed
            in&quot; box
          </span>
          .
        </p>
      </Notice>
    </div>
  );
};

const UsageInstructions = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p>
          Click the extension icon (🍏) in your browser toolbar to open the
          pop-up. It provides a MacOS-System-Settings-like UI where you can
          generate a new HideMyEmail address and manage your existing ones.
        </p>
        <p>
          To use a freshly generated address, click{' '}
          <span className="font-semibold">Use</span> to reserve it, then{' '}
          <span className="font-semibold">Copy to clipboard</span> and paste it
          into the sign-up form of any website. Each address is labelled with
          the site you are currently on, so it stays easy to recognise — you can
          edit the label and add a note before reserving.
        </p>
      </div>
      <Notice title="Managing your addresses">
        <p>
          In the &quot;Manage emails&quot; view you can search through your
          addresses and deactivate, reactivate, or delete any of them.
        </p>
      </Notice>
      <div>
        You can choose which address your mail is forwarded to in the{' '}
        <Link href="./options.html">extension Options</Link>.
      </div>
    </div>
  );
};

const TechnicalOverview = () => {
  return (
    <div className="space-y-2">
      <p>
        How does it work? At a high level, the extension interacts with the
        iCloud APIs by simulating the client behavior (i.e. the network
        requests) of the{' '}
        <Link href="https://icloud.com" aria-label="Go to iCloud.com">
          icloud.com
        </Link>{' '}
        web app. For authentication, it relies on the icloud.com cookies that
        have been stored in your browser following the sign-in flow outlined at
        the top of this guide.
      </p>
      <p>
        How does it access the icloud.com cookies? The extension has{' '}
        <Link href="https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/host_permissions">
          host permissions
        </Link>{' '}
        on several paths of the icloud.com host. When an extension has host
        permissions on a host, all extension ➡️ host-server requests are treated
        as{' '}
        <Link href="https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy">
          same-origin
        </Link>{' '}
        by the browser. By default, browsers include{' '}
        <Link href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#requests_with_credentials">
          credentials
        </Link>{' '}
        (e.g. cookies) in all same-origin requests.
      </p>
      <p>
        <span className="font-semibold">
          At no point does the extension have access to the Apple ID email and
          password that you feed into the icloud.com sign-in form
        </span>
        . The source of the extension is{' '}
        <Link
          href="https://github.com/dedoussis/icloud-hide-my-email-browser-extension"
          aria-label="source code"
        >
          publicly available in GitHub
        </Link>
        .
      </p>
      <p>
        If you&apos;re skeptical about using this extension, and looking for an
        alternative way of interacting with the HideMyEmail service outside of
        Safari, you can still use icloud.com on any browser. This extension only
        offers a more ergonomic browser experience compared to icloud.com.
      </p>
    </div>
  );
};

const Userguide = () => {
  return (
    <div className="w-9/12 m-auto mt-3 mb-24">
      <TitledComponent title="Hide My Email" subtitle="Quickstart guide">
        <div>
          <h3 className="font-bold text-lg mb-3">Sign-in to iCloud</h3>
          <SignInInstructions />
        </div>
        <div>
          <h3 className="font-bold text-lg mb-3">How to use?</h3>
          <UsageInstructions />
        </div>
        <div>
          <h3 className="font-bold text-lg mb-3">Advanced</h3>
          <TechnicalOverview />
        </div>
      </TitledComponent>
    </div>
  );
};

export default Userguide;
