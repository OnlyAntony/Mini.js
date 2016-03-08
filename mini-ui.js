/* ******************************************************
 * Mini-ui.js - A UI extension for Mini.js
 * Version: 1.0.2
 *
 * Developed by: Antony Lloyd - antony-lloyd.com
 * ******************************************************
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Antony Lloyd
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 *********************************************************/

/**
 * Shows a dialog box
 * @param array options The options to provide the function
 */
Mini.prototype.dialog = function(options)
{
	// Check if the options are show or hide
	if(options === "show")
	{
		Mini(this.elem).fadeIn({ speed : 25 });
		return;
	}
	else if(options === "hide")
	{
		Mini(this.elem).fadeOut({ speed : 25 });
		return;
	}

	// The default options
	var optionValues									= {
		title 			: "",
		width 			: 600,
		height 			: 400,
		buttons 		: null
	};

	optionValues 										= Mini.parseOptions(optionValues, options);

	// Check if the options are valid
	if(typeof optionValues["title"] !== "string")
		throw "Mini UI: Dialog title format is invalid";

	if(typeof optionValues["width"] !== "number")
		throw "Mini UI: Dialog width format is invalid";

	if(typeof optionValues["height"] !== "number")
		throw "Mini UI: Dialog height format is invalid";

	// Get the popup content
	var content 										= this.elem.innerHTML;
	this.elem.innerHTML									= "";

	// Set the sizes
	this.elem.style.width 								= optionValues["width"] + "px";
	this.elem.style.height 								= optionValues["height"] + "px";

	// Create the title
	var titleElem 										= Mini.create("<div class='mini_ui_dialog_title'>" + optionValues["title"] + "</div>");

	// Create the content
	var contentElem 									= Mini.create("<div class='mini_ui_dialog_content'></div>");
	contentElem.innerHTML = content;

	// Create the buttons
	var buttonsElem 									= null;

	// Generate the buttons
	if(optionValues["buttons"] != null)
	{
		var buttonsElem 								= Mini.create("<div class='mini_ui_dialog_buttons'></div>");

		for(var label in optionValues["buttons"])
		{
			var btn 									= Mini.create("<button id=''>" + label + "</button>");
			Mini(btn).click(optionValues["buttons"][label]);

			buttonsElem.appendChild(btn);
		}
	}

	this.elem.appendChild(titleElem);
	this.elem.appendChild(contentElem);

	if(buttonsElem != null)
		this.elem.appendChild(buttonsElem);
}

/**
 * Slides between multiple windows
 * @param array options The options to provide the function
 */
Mini.prototype.slide = function(options)
{
	// If there are no options, init the slide show
	if(options === undefined)
	{
		var windows 									= this.elem.getElementsByClassName("mini_ui_window");

		for(i = 0; i < windows.length; i++)
		{
			windows[i].style.cssText 					= "position: absolute; top: 0; left: 0; width: 100%";
			if(i != 0)
				windows[i].style.left 					= "110%";
		}
	}
	else
	{
		// The default options
		var optionValues								= {
			frame 				: 0
		};

		optionValues 									= Mini.parseOptions(optionValues, options);

		var currentFrame 								= 0;
		var windows 									= this.elem.getElementsByClassName("mini_ui_window");

		if(this.elem.hasAttribute("mini_ui_window_id"))
			currentFrame 								= this.elem.getAttribute("mini_ui_window_id");

		var targetId 									= 0;

		// Set the target frame from the options
		if(optionValues["frame"] == "next")
			targetId 									= parseInt(currentFrame) + 1;
		else if(optionValues["frame"] == "prev")
			targetId 									= parseInt(currentFrame) - 1;
		else
			targetId 									= optionValues["frame"];

		// Only allow to swap if the target is in bounds
		if(targetId >= 0 && targetId < windows.length)
		{
			if(targetId < currentFrame)
			{
				windows[currentFrame].style.left 		= "110%";
				windows[targetId].style.left 			= "0%";
			}
			else
			{
				windows[currentFrame].style.left 		= "-110%";
				windows[targetId].style.left 			= "0%";
			}

			this.elem.setAttribute("mini_ui_window_id", targetId);
		}
	}
}