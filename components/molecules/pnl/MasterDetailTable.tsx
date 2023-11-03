// components/MasterDetailTable.tsx
import { ChevronDown, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface IMasterDetailRow {
  children?: React.ReactNode;
  title?: string;
  values?: { [key: string]: { Cash: number; Accrual: number } };
}

type SubRowsState = Record<string, boolean>;

const MasterDetailTable = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedSub, setIsCheckedSub] = useState(false);
  const [rowStates, setRowStates] = useState<{
    [key: string]: boolean;
  }>({});

  const [isCheckedSubRows, setIsCheckedSubRows] = useState<
    Record<string, boolean>
  >({});

  const handleCheckboxChange = (newChecked: boolean) => {
    setIsChecked(newChecked);

    const updatedSubRows: SubRowsState = {};
    for (const key in isCheckedSubRows) {
      updatedSubRows[key] = newChecked;
    }
    setIsCheckedSubRows(updatedSubRows);
  };

  useEffect(() => {
    const areAllSubRowsChecked = Object.values(
      isCheckedSubRows
    ).every((value) => value);
    setIsCheckedSub(areAllSubRowsChecked);
  }, [isChecked, isCheckedSubRows]);

  const handleSubRowCheckboxChange = (
    title: string,
    newChecked: boolean
  ) => {
    setIsCheckedSubRows((prevState) => ({
      ...prevState,
      [title]: newChecked,
    }));
  };

  const handleRowCheckboxChange = (
    title: string,
    newChecked: boolean
  ) => {
    setRowStates((prevState) => ({
      ...prevState,
      [title]: newChecked,
    }));
  };

  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <div className="flex flex-row">
        <div className="flex flex-col items-center justify-center">
          <div className="flex h-full w-[139px] flex-row items-center border-b border-r pl-6 md:w-[178px] lg:w-[239px] xl:w-[282px] 2xl:w-[380px]">
            <p className="text-base font-bold lg:text-lg">
              FYE December 31
            </p>
          </div>
        </div>
        <div className="grid w-full grid-cols-4">
          <div className="flex w-full flex-col items-center gap-2 border-b border-r py-2">
            <p className="text-base font-bold lg:text-lg">Q1</p>
            <div className="flex flex-row gap-4">
              <p className="text-base font-semibold lg:text-lg">
                Cash
              </p>
              <p className="text-base font-semibold lg:text-lg">
                Accrual
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col items-center gap-2 border-b border-r py-2">
            <p className="text-base font-bold lg:text-lg">Q2</p>
            <div className="flex flex-row gap-4">
              <p className="text-base font-semibold lg:text-lg">
                Cash
              </p>
              <p className="text-base font-semibold lg:text-lg">
                Accrual
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col items-center gap-2 border-b border-r py-2">
            <p className="text-base font-bold lg:text-lg">Q3</p>
            <div className="flex flex-row gap-4">
              <p className="text-base font-semibold lg:text-lg">
                Cash
              </p>
              <p className="text-base font-semibold lg:text-lg">
                Accrual
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col items-center gap-2 border-b py-2">
            <p className="text-base font-bold lg:text-lg">Q4</p>
            <div className="flex flex-row gap-4">
              <p className="text-base font-semibold lg:text-lg">
                Cash
              </p>
              <p className="text-base font-semibold lg:text-lg">
                Accrual
              </p>
            </div>
          </div>
        </div>
      </div>
      <MasterDetailRow
        title={'Net Sales'}
        values={{
          Q1: { Cash: 1000, Accrual: 1000 },
          Q2: { Cash: 1200, Accrual: 1200 },
          Q3: { Cash: 1800, Accrual: 1800 },
          Q4: { Cash: 2200, Accrual: 2200 },
        }}
        checked={rowStates['Net Sales']}
        onCheckboxChange={(newChecked) =>
          handleRowCheckboxChange('Net Sales', newChecked)
        }
      >
        <MasterDetailSubRow
          title={'COGs (direct: variable + fixed)'}
          values={{
            Q1: { Cash: 600, Accrual: 600 },
            Q2: { Cash: 800, Accrual: 800 },
            Q3: { Cash: 1800, Accrual: 1800 },
            Q4: { Cash: 2200, Accrual: 2200 },
          }}
          checkedSub={
            isCheckedSubRows['COGs (direct: variable + fixed)']
          }
          onCheckboxChange={(newChecked) =>
            handleSubRowCheckboxChange(
              'COGs (direct: variable + fixed)',
              newChecked
            )
          }
        />
      </MasterDetailRow>
      <MasterDetailRow
        title="Gross Margin"
        values={{
          Q1: { Cash: 400, Accrual: 400 },
          Q2: { Cash: 400, Accrual: 400 },
          Q3: { Cash: 400, Accrual: 400 },
          Q4: { Cash: 400, Accrual: 400 },
        }}
        checked={rowStates['Gross Margin']}
        onCheckboxChange={(newChecked) =>
          handleRowCheckboxChange('Gross Margin', newChecked)
        }
      ></MasterDetailRow>
      <MasterDetailRow
        title="SG&A"
        values={{
          Q1: { Cash: 500, Accrual: 500 },
          Q2: { Cash: 600, Accrual: 600 },
          Q3: { Cash: 700, Accrual: 700 },
          Q4: { Cash: 800, Accrual: 800 },
        }}
        checked={rowStates['SG&A']}
        onCheckboxChange={(newChecked) =>
          handleRowCheckboxChange('SG&A', newChecked)
        }
      >
        <MasterDetailSubRow
          title={'Salaries, wages and Social Secutiry paid'}
          values={{
            Q1: { Cash: 200, Accrual: 200 },
            Q2: { Cash: 250, Accrual: 250 },
            Q3: { Cash: 300, Accrual: 300 },
            Q4: { Cash: 350, Accrual: 350 },
          }}
          checkedSub={
            isCheckedSubRows[
              'Salaries, wages and Social Secutiry paid'
            ]
          }
          onCheckboxChange={(newChecked) =>
            handleSubRowCheckboxChange(
              'Salaries, wages and Social Secutiry paid',
              newChecked
            )
          }
        />
        <MasterDetailSubRow
          title={'Rentals'}
          values={{
            Q1: { Cash: 100, Accrual: 100 },
            Q2: { Cash: 120, Accrual: 120 },
            Q3: { Cash: 140, Accrual: 140 },
            Q4: { Cash: 160, Accrual: 160 },
          }}
          checkedSub={isCheckedSubRows['Rentals']}
          onCheckboxChange={(newChecked) =>
            handleSubRowCheckboxChange('Rentals', newChecked)
          }
        />
        <MasterDetailSubRow
          title={'Facilities and supplies'}
          values={{
            Q1: { Cash: 600, Accrual: 300 },
            Q2: { Cash: 800, Accrual: 400 },
            Q3: { Cash: 1800, Accrual: 800 },
            Q4: { Cash: 2200, Accrual: 1200 },
          }}
          checkedSub={isCheckedSubRows['Facilities and supplies']}
          onCheckboxChange={(newChecked) =>
            handleSubRowCheckboxChange(
              'Facilities and supplies',
              newChecked
            )
          }
        />
        <MasterDetailSubRow
          title={'Insurance premiums'}
          values={{
            Q1: { Cash: 600, Accrual: 300 },
            Q2: { Cash: 800, Accrual: 400 },
            Q3: { Cash: 1800, Accrual: 800 },
            Q4: { Cash: 2200, Accrual: 1200 },
          }}
          checkedSub={isCheckedSubRows['Insurance premiums']}
          onCheckboxChange={(newChecked) =>
            handleSubRowCheckboxChange(
              'Insurance premiums',
              newChecked
            )
          }
        />
        <MasterDetailSubRow
          title={'Business licenses'}
          values={{
            Q1: { Cash: 600, Accrual: 300 },
            Q2: { Cash: 800, Accrual: 400 },
            Q3: { Cash: 1800, Accrual: 800 },
            Q4: { Cash: 2200, Accrual: 1200 },
          }}
          checkedSub={isCheckedSubRows['Business licenses']}
          onCheckboxChange={(newChecked) =>
            handleSubRowCheckboxChange(
              'Business licenses',
              newChecked
            )
          }
        />
      </MasterDetailRow>
      <MasterDetailRow
        title="EBITDA"
        values={{
          Q1: { Cash: 300, Accrual: 300 },
          Q2: { Cash: 350, Accrual: 350 },
          Q3: { Cash: 400, Accrual: 400 },
          Q4: { Cash: 450, Accrual: 450 },
        }}
        checked={rowStates['EBITDA']}
        onCheckboxChange={(newChecked) =>
          handleRowCheckboxChange('EBITDA', newChecked)
        }
      >
        <MasterDetailSubRow
          title={'D&A (including D&A from A/I robots)'}
          values={{
            Q1: { Cash: 100, Accrual: 100 },
            Q2: { Cash: 120, Accrual: 120 },
            Q3: { Cash: 140, Accrual: 140 },
            Q4: { Cash: 160, Accrual: 160 },
          }}
          checkedSub={
            isCheckedSubRows['D&A (including D&A from A/I robots)']
          }
          onCheckboxChange={(newChecked) =>
            handleSubRowCheckboxChange(
              'D&A (including D&A from A/I robots)',
              newChecked
            )
          }
        />
      </MasterDetailRow>
      <MasterDetailRow
        title="EBIT=OPERATING PROFIT (BAII)"
        values={{
          Q1: { Cash: 200, Accrual: 200 },
          Q2: { Cash: 250, Accrual: 250 },
          Q3: { Cash: 300, Accrual: 300 },
          Q4: { Cash: 350, Accrual: 350 },
        }}
        checked={rowStates['EBIT=OPERATING PROFIT (BAII)']}
        onCheckboxChange={(newChecked) =>
          handleRowCheckboxChange(
            'EBIT=OPERATING PROFIT (BAII)',
            newChecked
          )
        }
      >
        <MasterDetailSubRow
          title={'Financial interest expenses'}
          values={{
            Q1: { Cash: 50, Accrual: 50 },
            Q2: { Cash: 60, Accrual: 60 },
            Q3: { Cash: 70, Accrual: 70 },
            Q4: { Cash: 80, Accrual: 80 },
          }}
          checkedSub={isCheckedSubRows['Financial interest expenses']}
          onCheckboxChange={(newChecked) =>
            handleSubRowCheckboxChange(
              'Financial interest expenses',
              newChecked
            )
          }
        />
      </MasterDetailRow>
      <MasterDetailRow
        title="EBT (BAI)"
        values={{
          Q1: { Cash: 150, Accrual: 150 },
          Q2: { Cash: 190, Accrual: 190 },
          Q3: { Cash: 230, Accrual: 230 },
          Q4: { Cash: 270, Accrual: 270 },
        }}
        checked={rowStates['EBT (BAI)']}
        onCheckboxChange={(newChecked) =>
          handleRowCheckboxChange('EBT (BAI)', newChecked)
        }
      >
        <MasterDetailSubRow
          title={'Corporate taxes (25%)'}
          values={{
            Q1: { Cash: 50, Accrual: 50 },
            Q2: { Cash: 60, Accrual: 60 },
            Q3: { Cash: 70, Accrual: 70 },
            Q4: { Cash: 80, Accrual: 80 },
          }}
          checkedSub={isCheckedSubRows['Corporate taxes (25%)']}
          onCheckboxChange={(newChecked) =>
            handleSubRowCheckboxChange(
              'Corporate taxes (25%)',
              newChecked
            )
          }
        />
      </MasterDetailRow>
      <MasterDetailRow
        title="Net Income"
        values={{
          Q1: { Cash: 100, Accrual: 100 },
          Q2: { Cash: 130, Accrual: 130 },
          Q3: { Cash: 160, Accrual: 160 },
          Q4: { Cash: 190, Accrual: 190 },
        }}
        checked={rowStates['Net Income']}
        onCheckboxChange={(newChecked) =>
          handleRowCheckboxChange('Net Income', newChecked)
        }
      >
        <MasterDetailSubRow
          title={'Earnings per share (EPS)'}
          values={{
            Q1: { Cash: 20, Accrual: 20 },
            Q2: { Cash: 26, Accrual: 26 },
            Q3: { Cash: 32, Accrual: 32 },
            Q4: { Cash: 38, Accrual: 38 },
          }}
          checkedSub={isCheckedSubRows['Earnings per share (EPS)']}
          onCheckboxChange={(newChecked) =>
            handleSubRowCheckboxChange(
              'Earnings per share (EPS)',
              newChecked
            )
          }
        />
        <MasterDetailSubRow
          title={'PO=Pay-out (dividends paid)'}
          values={{
            Q1: { Cash: 30, Accrual: 30 },
            Q2: { Cash: 35, Accrual: 35 },
            Q3: { Cash: 40, Accrual: 40 },
            Q4: { Cash: 45, Accrual: 45 },
          }}
          checkedSub={isCheckedSubRows['PO=Pay-out (dividends paid)']}
          onCheckboxChange={(newChecked) =>
            handleSubRowCheckboxChange(
              'PO=Pay-out (dividends paid)',
              newChecked
            )
          }
        />
        <MasterDetailSubRow
          title={'Reinvestment'}
          values={{
            Q1: { Cash: 40, Accrual: 40 },
            Q2: { Cash: 50, Accrual: 50 },
            Q3: { Cash: 60, Accrual: 60 },
            Q4: { Cash: 70, Accrual: 70 },
          }}
          checkedSub={isCheckedSubRows['Reinvestment']}
          onCheckboxChange={(newChecked) =>
            handleSubRowCheckboxChange('Reinvestment', newChecked)
          }
        />
        <MasterDetailSubRow
          title={'Equity (E)'}
          values={{
            Q1: { Cash: 60, Accrual: 60 },
            Q2: { Cash: 70, Accrual: 70 },
            Q3: { Cash: 80, Accrual: 80 },
            Q4: { Cash: 90, Accrual: 90 },
          }}
          checkedSub={isCheckedSubRows['Equity (E)']}
          onCheckboxChange={(newChecked) =>
            handleSubRowCheckboxChange('Equity (E)', newChecked)
          }
        />
      </MasterDetailRow>
      <MasterDetailRow
        title={'Gross Revenue'}
        values={{
          Q1: { Cash: 2000, Accrual: 2000 },
          Q2: { Cash: 2500, Accrual: 2500 },
          Q3: { Cash: 2200, Accrual: 2200 },
          Q4: { Cash: 2700, Accrual: 2700 },
        }}
        checked={rowStates['Gross Revenue']}
        onCheckboxChange={(newChecked) =>
          handleRowCheckboxChange('Gross Revenue', newChecked)
        }
      />
    </div>
  );
};

export default MasterDetailTable;

const MasterDetailRow = ({
  children,
  title,
  values,
  checked,
  onCheckboxChange,
}: IMasterDetailRow & {
  checked: boolean;
  onCheckboxChange: (checked: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubrows = () => {
    setIsOpen(!isOpen);
  };

  const toggleCheckbox = () => {
    const newChecked = !checked;
    onCheckboxChange(newChecked);

    if (children && React.Children.count(children) > 0) {
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === MasterDetailSubRow) {
            child.props.onCheckboxChange(newChecked);
          }
        }
      });
    }
  };

  return (
    <div className="flex flex-col">
      <div
        className={`flex flex-row items-center border-b ${
          checked
            ? 'bg-indigo-100 font-medium'
            : 'bg-gray-100 font-medium'
        }`}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={toggleCheckbox}
          className="mx-3 cursor-pointer"
        />
        {children ? (
          <div onClick={toggleSubrows} className="cursor-pointer">
            {isOpen ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </div>
        ) : (
          <div className="w-5 pl-5"></div>
        )}
        <div className="flex flex-row">
          <div className="flex h-full flex-row items-center p-2 text-sm sm:w-[82px] md:w-[122px] lg:w-[182px] lg:text-base xl:w-[282px] 2xl:w-[322px]">
            <p>{title}</p>
          </div>
        </div>
        {values && (
          <div className="grid w-full grid-cols-4">
            {Object.entries(values).map(([key, value]) => (
              <div
                key={key}
                className="flex w-full flex-col items-center p-2"
              >
                {typeof value === 'object' ? (
                  <div className="flex flex-row gap-4">
                    <div className="text-sm font-semibold md:text-base">
                      {value.Cash}
                    </div>
                    <div className="text-sm font-semibold md:text-base">
                      {value.Accrual}
                    </div>
                  </div>
                ) : (
                  <div>{value}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {isOpen && children ? <div className="">{children}</div> : null}
    </div>
  );
};

const MasterDetailSubRow = ({
  title,
  values,
  checkedSub,
  onCheckboxChange,
}: IMasterDetailRow & {
  checkedSub: boolean;
  onCheckboxChange: (checkedSub: boolean) => void;
}) => {
  const toggleCheckbox = () => {
    const newChecked = !checkedSub;
    onCheckboxChange(newChecked);
  };

  return (
    <div className="flex flex-col">
      <div
        className={`flex flex-row items-center border-b ${
          checkedSub
            ? 'bg-indigo-100 font-medium'
            : 'bg-white font-medium'
        }`}
      >
        <input
          type="checkbox"
          checked={checkedSub}
          onChange={toggleCheckbox}
          className="mx-3 cursor-pointer"
        />
        <div className="w-5 pl-5"></div>
        <div className="flex flex-row">
          <div className="flex h-full flex-row items-center p-2 text-sm sm:w-[82px] md:w-[122px] lg:w-[182px] lg:text-base xl:w-[282px] 2xl:w-[322px]">
            <p>{title}</p>
          </div>
        </div>
        {values && (
          <div className="grid w-full grid-cols-4">
            {Object.entries(values).map(([key, value]) => (
              <div
                key={key}
                className="flex w-full flex-col items-center p-2"
              >
                {typeof value === 'object' ? (
                  <div className="flex flex-row gap-4">
                    <div className="text-sm font-semibold md:text-base">
                      {value.Cash}
                    </div>
                    <div className="text-sm font-semibold md:text-base">
                      {value.Accrual}
                    </div>
                  </div>
                ) : (
                  <div>{value}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { MasterDetailRow, MasterDetailSubRow };
