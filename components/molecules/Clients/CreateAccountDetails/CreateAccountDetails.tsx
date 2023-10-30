import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { iCreateAccountDetail,accountDetailSchema } from '@/lib/schema/Clients/clients';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { SetStateAction, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ICreateAccount {
    setAccoundModal: React.Dispatch<SetStateAction<boolean>>;
    setAccountDetails : any;
    accCon:any;
    accNr:any;
    isUpdate:any;
    // (value: React.SetStateAction<{
    //     accountNumber: string;
    //     country: string;
    // }>) => void
}

const CreateAccountDetails = ({ setAccoundModal,setAccountDetails,accCon,accNr,isUpdate}: ICreateAccount) => {
  const form = useForm<iCreateAccountDetail>({
    resolver: zodResolver(accountDetailSchema),
  });
  

  const [isSubmitting, setIsSubmitting] = useState(false);
//   const accountDetails: { accountNumber: string; country: string }[] = [];

  
  const onSubmit = useCallback(
    async (data: iCreateAccountDetail) => {


        if(data.clientAccountNumbers.country == undefined || data.clientAccountNumbers.accountNumber == undefined)
            console.log("empty arrays")
        else{

            // if(accCon != null || undefined || ''){
              
            // }
            setAccountDetails((prev:any) => ([
                ...prev,
                {
                  accountNumber: data.clientAccountNumbers.accountNumber == undefined || null ? "" : data.clientAccountNumbers.accountNumber,
                  country: data.clientAccountNumbers.country == undefined || null ? "" : data.clientAccountNumbers.country,
                },
              ]));
        }


    setAccoundModal(false);
    },
    []
  );
  const onError =(error:any)=>{
    console.log("EEERRROOR->",error);
  }

  return (
    <div className="z-0 flex w-full flex-col gap-4  ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit,onError)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-row  items-center justify-center  gap-4 ">
            {/* project */}

            <FormField
              control={form.control}
              name="clientAccountNumbers.accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>

                  <FormControl className="relative">
                    <Input
                      placeholder="Account Number"
                      {...field}
                      disabled={isSubmitting}
                      value={accNr!=''||undefined||null ? accNr : ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

              <FormField
              control={form.control}
              name="clientAccountNumbers.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account country</FormLabel>

                  <FormControl className="relative">
                    <Input
                      placeholder="Account country"
                      {...field}
                      disabled={isSubmitting}
                      value={isUpdate == true ? accCon : ""}
                    />
                    
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />

          </div>
          

          <div className="flex flex-row items-center gap-2">
            <Button
              variant="outline"
              type="button"
              className="w-max"
              onClick={() => setAccoundModal(false)}
            >
              Cancel
            </Button>
            {isUpdate == true ?            
            <Button type="submit" className="w-max">
              Change
            </Button>
            :
            <Button type="submit" className="w-max">
            Submit
          </Button>
            
            }
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateAccountDetails;
