import { useEffect, useRef, useState } from "react";
import { cleanStringStyle, useMutation } from "@orderly.network/hooks";
import { Decimal } from "@orderly.network/utils";
import { ReferralCodeType } from "./referralCodes.script";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Input,
  modal,
  toast,
  useModal,
} from "@orderly.network/ui";

export const EditReferralRate = modal.create<{
  code: ReferralCodeType;
  mutate: any;
}>((props) => {
  const { code, mutate } = props;
  const { visible, hide, resolve, reject, onOpenChange } = useModal();
  const maxRate = new Decimal(code.max_rebate_rate).mul(100);
  const [refereeRebateRate, setRefereeRebateRate] = useState(
    `${new Decimal(code.referee_rebate_rate).mul(100)}`
  );
  const [referrerRebateRate, setReferrerRebateRate] = useState(
    `${new Decimal(code.referrer_rebate_rate).mul(100)}`
  );
  const [showError, setShowError] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [inputRef]);

  useEffect(() => {
    setRefereeRebateRate(`${new Decimal(code.referee_rebate_rate).mul(100)}`);
    setReferrerRebateRate(`${new Decimal(code.referrer_rebate_rate).mul(100)}`);
  }, [code]);

  const [editRate, { error, isMutating }] = useMutation(
    "/v1/referral/edit_split",
    "POST"
  );

  const onClickConfirm = async () => {
    try {
      const r1 = Number.parseFloat(refereeRebateRate);
      const r2 = Number.parseFloat(referrerRebateRate);

      await editRate({
        referral_code: code.code,
        referee_rebate_rate: r1 / 100,
        referrer_rebate_rate: r2 / 100,
      });
      toast.success("Referral code edited");
      mutate();
      hide();
    } catch (e) {
      // @ts-ignore
      toast.error(e?.message || e || "");
    }
  };

  return (
    <Dialog open={visible} onOpenChange={onOpenChange}>
      <DialogContent
        className="oui-px-6 oui-max-w-[320px] oui-bg-base-8 oui-shadow-[0px_12px_20px_0px_rgba(0,0,0,0.25)]"
        closable
      >
        <DialogTitle >
          <div className="oui-my-3">Settings</div>
          <Divider  />
        </DialogTitle>

        <div className="oui-mt-3 oui-h-full oui-flex oui-flex-col oui-justify-end">
          <div className="oui-text-xs oui-text-base-contrast-54">
            Set the ratio of referral rate shared with your referees
          </div>
          <div className="oui-text-xs oui-text-base-contrast-80 oui-mt-2 oui-flex">
            {`Your max commission rate: `}
            <div className="oui-text-warning oui-pl-1">{`${new Decimal(
              code.max_rebate_rate
            )
              .mul(100)
              .toFixed(0, Decimal.ROUND_DOWN)}%`}</div>
          </div>

          <div className="oui-text-2xs oui-mt-6 oui-text-base-contrast-80">
            You receive
          </div>
          <Input
            ref={inputRef}
            containerClassName="oui-h-[40px] oui-mt-3 oui-bg-base-700 oui-outline oui-outline-1 oui-outline-base-contrast-12 focus-within:oui-outline-primary"
            placeholder="Enter code"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={referrerRebateRate}
            onChange={(e) => {
              const text = cleanStringStyle(e.target.value);
              const rate = Number.parseFloat(text);
              setReferrerRebateRate(text);
              if (!Number.isNaN(rate)) {
                setRefereeRebateRate(
                  `${maxDecimal(new Decimal(0), maxRate.sub(rate))}`
                );
                setShowError(maxRate.sub(rate) < new Decimal(0));
              } else {
                setRefereeRebateRate("");
                setReferrerRebateRate("");
              }
            }}
            suffix={
              <div className="oui-px-3 oui-text-base-contrast-54 oui-text-base">
                %
              </div>
            }
          />

          <div className="oui-text-2xs oui-mt-6 oui-text-base-contrast-80">
            Referee receives
          </div>
          <Input
            containerClassName="oui-h-[40px] oui-mt-3 oui-bg-base-700 oui-outline oui-outline-1 oui-outline-base-contrast-12 focus-within:oui-outline-primary"
            placeholder="Enter code"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            autoFocus={false}
            value={refereeRebateRate}
            onChange={(e) => {
              const text = cleanStringStyle(e.target.value);
              const rate = Number.parseFloat(text);
              setRefereeRebateRate(text);
              if (!Number.isNaN(rate)) {
                setReferrerRebateRate(
                  `${maxDecimal(new Decimal(0), maxRate.sub(rate))}`
                );
                setShowError(maxRate.sub(rate) < new Decimal(0));
              } else {
                setRefereeRebateRate("");
                setReferrerRebateRate("");
              }
            }}
            suffix={
              <div className="oui-px-3 oui-text-base-contrast-54 oui-text-base">
                %
              </div>
            }
          />

          {showError && (
            <div className="oui-text-danger oui-text-3xs oui-mt-3 oui-items-start oui-relative">
              <div className="oui-bg-danger oui-rounded-full oui-w-[4px] oui-h-[4px] oui-mr-1 oui-mt-2 oui-absolute oui-top-0"></div>
              <div className="oui-ml-2">{`The total commission rate must equal to your maximum commission rate limit`}</div>
            </div>
          )}

          <Button
            id="referral_bind_referral_code_btn"
            disabled={
              refereeRebateRate.length === 0 ||
              referrerRebateRate.length === 0 ||
              showError
            }
            loading={isMutating}
            className="oui-mt-6 oui-mb-4"
            onClick={(e) => {
              e.stopPropagation();
              onClickConfirm();
            }}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
});

function maxDecimal(a: Decimal, b: Decimal) {
  return a > b ? a : b;
}
