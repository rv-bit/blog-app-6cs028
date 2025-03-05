import { Head } from "@inertiajs/react";

import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { PageProps } from "@/types";

import DeleteUserForm from "./components/DeleteUserForm";
import UpdatePasswordForm from "./components/UpdatePasswordForm";
import UpdateProfileInformationForm from "./components/UpdateProfileInformationForm";

export default function Edit({
	mustVerifyEmail,
	status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
	return (
		<AuthenticatedLayout
			header={
				<h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
					Profile
				</h2>
			}
		>
			<Head title="Profile" />

			<div className="py-12">
				<div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
					<div className="bg-white p-4 shadow-sm sm:rounded-lg sm:p-8 dark:bg-gray-800">
						<UpdateProfileInformationForm
							mustVerifyEmail={mustVerifyEmail}
							status={status}
							className="max-w-xl"
						/>
					</div>

					<div className="bg-white p-4 shadow-sm sm:rounded-lg sm:p-8 dark:bg-gray-800">
						<UpdatePasswordForm className="max-w-xl" />
					</div>

					<div className="bg-white p-4 shadow-sm sm:rounded-lg sm:p-8 dark:bg-gray-800">
						<DeleteUserForm className="max-w-xl" />
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
