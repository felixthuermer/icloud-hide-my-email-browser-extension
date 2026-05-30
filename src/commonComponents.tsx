import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const Spinner = () => {
  return (
    <div className="text-center">
      <FontAwesomeIcon
        icon={faSpinner}
        spin={true}
        className="text-3xl text-accent"
      />
    </div>
  );
};

export const LoadingButton = (
  props: {
    loading: boolean;
  } & DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  const { loading, disabled, ...btnHtmlAttrs } = props;

  const defaultClassName =
    'w-full justify-center text-accent-contrast bg-accent hover:bg-accent-hover focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent font-medium rounded-xl px-5 py-2.5 text-center inline-flex items-center transition-colors';

  const diabledClassName =
    'w-full justify-center text-muted bg-elevated font-medium rounded-xl px-5 py-2.5 text-center inline-flex items-center';

  const btnClassName = disabled ? diabledClassName : defaultClassName;

  return (
    <button
      type="submit"
      className={btnClassName}
      disabled={loading || disabled}
      {...btnHtmlAttrs}
    >
      {loading && !disabled && (
        <FontAwesomeIcon icon={faSpinner} spin={true} className="mr-1" />
      )}
      {props.children}
    </button>
  );
};

export const ErrorMessage = (props: { children?: React.ReactNode }) => {
  return (
    <div
      className="p-2 text-sm text-danger bg-danger-bg rounded-lg"
      role="alert"
    >
      {props.children}
    </div>
  );
};

export const TitledComponent = (props: {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}) => {
  const children =
    props.children instanceof Array ? props.children : [props.children];

  return (
    <div className="text-base space-y-3">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-fg">{props.title}</h1>
        <h2 className="font-medium text-muted">{props.subtitle}</h2>
      </div>
      {children?.map((child, key) => {
        return (
          child && (
            <React.Fragment key={key}>
              <hr />
              {child}
            </React.Fragment>
          )
        );
      })}
    </div>
  );
};

export const Link = (
  props: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
) => {
  // https://github.com/jsx-eslint/eslint-plugin-react/issues/3284
  // eslint-disable-next-line react/prop-types
  const { className, children, ...restProps } = props;
  return (
    <a
      className={`text-accent hover:text-accent-hover ${className}`}
      target="_blank"
      rel="noreferrer"
      {...restProps}
    >
      {children}
    </a>
  );
};
