import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Button, FormInput, FormTextArea, Layout } from '../../components';
import { useAppSelector } from '../../hooks/redux';

const tabsHeadings = ['Profile', 'Notifications', 'Security'];

// TODO:
// image with upload/delete on S3;
// validation
// update user in db

type Props = {};

type Inputs = {
  name: string;
  surname: string;
  username: string;
  phone: string;
  bio: string;
};

export const SettingsPage = ({}: Props) => {
  const { user } = useAppSelector(({ auth }) => auth);

  const [selectedTab, setSelectedTab] = useState(tabsHeadings[0]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: user?.name,
      surname: user?.surname,
      username: user?.username,
      phone: user?.phone,
      bio: user?.bio,
    },
  });

  const submit: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log(`data >>>`, data);
  };

  return (
    <Layout>
      <div className="px-7 py-8">
        <h2 className="text-2xl font-bold">Settings</h2>

        <div className="flex my-8 gap-x-4">
          {tabsHeadings.map((heading) => (
            <button
              key={heading}
              onClick={() => setSelectedTab(heading)}
              className={`px-4 py-2 border text-white border-black bg-black hover:bg-white hover:text-black transition-colors duration-150 ${
                selectedTab === heading ? 'bg-white text-black' : ''
              }`}
            >
              {heading}
            </button>
          ))}
        </div>

        {selectedTab === tabsHeadings[0] && (
          <form onSubmit={handleSubmit(submit)} className="border border-dashed border-black p-8">
            <h3 className="mb-4 font-semibold text-lg">
              Change your profile data
            </h3>

            <div className="grid grid-cols-2 gap-x-8">
              <FormInput
                id="name"
                label="Name"
                placeholder="Name"
                register={register}
                // error={errors.email}
              />
              <FormInput
                id="surname"
                label="Surname"
                placeholder="Surname"
                register={register}
                // error={errors.email}
              />
              <FormInput
                id="username"
                label="Username"
                placeholder="Username"
                register={register}
                // error={errors.email}
              />
              <FormInput
                id="phone"
                label="Phone"
                placeholder="Phone"
                register={register}
                // error={errors.email}
              />
            </div>

            <FormTextArea
              id="bio"
              label="Bio"
              placeholder="Bio"
              rows={4}
              register={register}
            />

            <div className="text-center mt-8">
              <Button>Submit</Button>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
};
