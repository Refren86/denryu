import { ChangeEvent, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Button, FormInput, FormTextArea, Layout } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateUser, uploadAvatar } from '../../store/redux/slices/auth.slice';
import { classNames } from '../../helpers/common';

const tabsHeadings = ['Profile', 'Notifications', 'Security'];

// TODO:
// image with upload/delete on S3;
// validation

type Props = {};

type Inputs = {
  name: string;
  surname: string;
  username: string;
  phone: string;
  bio: string;
};

export const SettingsPage = ({}: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(({ auth }) => auth);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>(tabsHeadings[0]);

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

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        const formData = new FormData();
        formData.append('avatar', selectedFile);

        dispatch(uploadAvatar({ userId: user!._id, avatar: formData }));

        // Update avatarPreview state with the base64-encoded data URL of the selected file
        setAvatarPreview(reader.result?.toString() ?? null);
      };
    }
  };

  const submit: SubmitHandler<Inputs> = (data: Inputs) => {
    dispatch(updateUser({ userId: user!._id, newData: data }));
  };

  const uploadButtonClasses = classNames(
    'flex items-center justify-center',
    'w-32 h-32',
    'rounded-full',
    'bg-gray-200 hover:bg-gray-300',
    'text-gray-500 hover:text-gray-600',
    'cursor-pointer',
    avatarPreview && 'ring-2 ring-gray-400',
  );

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
          <div className="border border-dashed border-black p-8">
            <div className="flex flex-col items-center mb-8">
              <label htmlFor="avatar-input">
                <div className={uploadButtonClasses}>
                  {user?.image ? (
                    // avatarPreview.includes('data:video') ? (
                    //   <video
                    //     src={avatarPreview}
                    //     className="w-full h-full rounded-full object-cover"
                    //     autoPlay={true}
                    //     muted={true}
                    //     loop={true}
                    //   />
                    // ) : (
                      <img
                        src={user.image}
                        alt="avatar"
                        className="w-full h-full rounded-full object-cover"
                      />
                    // )
                  ) : (
                    <svg
                      className="w-12 h-12 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  )}
                </div>
              </label>
              {/* Hidden input element */}
              <input
                type="file"
                id="avatar-input"
                accept="image/*, video/*"
                className="sr-only"
                onChange={handleAvatarChange}
              />

              <p className="mt-2 text-sm text-gray-500">
                Click to upload avatar (up to 20 MB)
              </p>
            </div>

            <form onSubmit={handleSubmit(submit)}>
              <h3 className="mb-4 font-semibold text-lg">Change your profile data</h3>

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

              <FormTextArea id="bio" label="Bio" placeholder="Bio" rows={4} register={register} />

              <div className="text-center mt-8">
                <Button>Submit</Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
};
