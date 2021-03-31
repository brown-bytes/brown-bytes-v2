import React, { Fragment, useEffect } from "react";

import { clearAlerts } from "../../actions/alert";

const About = () => {
	useEffect(() => {
		clearAlerts();
	}, []);

	return (
		<Fragment>
			<p className="about-first-heading">About Brown Bytes</p>
			<p className="about-text">
				Brown Bytes is a platform for sharing free food and meal
				credits. It was initially developed as an application to
				facilitate the donation and exchange of meal credits between
				students at Brown University but later also became a place to
				find free food. Brown Bytes was developed by a Brown student
				with the goal of building a community to help fix a flawed
				meal-plan system.
			</p>
			<ul>
				<li>
					Built to help Brown students support each other through
					giving meal swipes and credits.
				</li>
				<li>
					Learn and contribute to our vision by joining our{" "}
					<a href="https://discord.gg/FuVWu8K">Discord</a>.
				</li>
				<li>
					Never waste a swipe by giving to your fellow hungry
					Brunonians.
				</li>
				<li>
					Give and receive: A new payment method (Coming Soon to Brown
					Bytes!)
				</li>
				<li>Meet other hungry people!</li>
				<li>Brown Bytes was built for fun by a Brown student!</li>
			</ul>
			<p className="about-second-heading">
				Join the Fight Against Food Insecurity
			</p>
			<p className="about-text">
				We at Brown Bytes believe that food insecurity is a serious
				problem facing students on campus, and we are taking action to
				give all students a place to turn when all else fails. Our goal
				is to list free food on campus that is healthy and provides a
				variety of options to students at all times of day. With this
				mission in mind, we need your help to contribute to our list of
				free food, and to offer excess meal credits to those in need.
			</p>
			<p className="about-second-heading">
				See more about the Brown Bytes project on{" "}
				<a
					href="https://github.com/brown-bytes/brown-bytes"
					target="_blank"
					rel="noreferrer">
					<i className="fab fa-github"></i>GitHub
				</a>
			</p>
			<p className="about-text">
				Brown Bytes is a 100% non-profit initiative.
			</p>
			<p className="about-text">
				Brown Bytes is in not associated with, sponsored by, or built in
				coordination with{" "}
				<a
					href="https://www.brown.edu/"
					target="_blank"
					rel="noreferrer">
					Brown University
				</a>
				.
			</p>
			<p className="about-text">
				Brown Bytes is an application built with{" "}
				<a href="https://reactjs.org/" target="_blank" rel="noreferrer">
					React
				</a>{" "}
				and{" "}
				<a
					href="https://redux.js.org/"
					target="_blank"
					rel="noreferrer">
					Redux
				</a>
				.
			</p>
		</Fragment>
	);
};

export default About;
