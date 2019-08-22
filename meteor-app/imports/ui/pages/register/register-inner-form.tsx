import React from "react";
import { Form } from "formik";
import styled from "styled-components";

import IfFormik from "imports/ui/components/if-formik";
import { Field, FormToolbar } from "imports/ui/components/form-stuff";
import { Button } from "imports/ui/components/button";
import { translations } from "imports/ui/translations";

const T = translations.loginRegister;

const RegisterButton = styled(Button)`
	font-size: 22px;
	width: 100%;
	margin-top: 20px;
`;

function InnerForm() {
	return (
		<Form noValidate>
			<T
				renderer={t => (
					<Field name="role" select required label="I am a...">
						<option value="">(Select One)</option>
						<option value="worker">{t.employee}</option>
						<option value="company">{t.employer}</option>
					</Field>
				)}
			/>

			<IfFormik
				cond={formik =>
					formik.values.role === "worker" ||
					formik.values.role === "company"
				}
			>
				<Field name="username" type="text" required t={T.username} />

				<Field name="email" type="email" required t={T.email} />

				<IfFormik cond={formik => formik.values.role === "company"}>
					<Field name="companyName" type="text" t={T.companyName} />
				</IfFormik>

				<Field
					name="password"
					type="password"
					required
					t={T.password}
				/>

				<FormToolbar>
					<RegisterButton primary type="submit">
						<T.createAccount />
					</RegisterButton>
				</FormToolbar>
			</IfFormik>
		</Form>
	);
}

export default InnerForm;
