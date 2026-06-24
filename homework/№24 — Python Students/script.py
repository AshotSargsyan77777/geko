students = {
    "Արամ": [90, 85, 100],
    "Աննա": [75, 88],
    "Կարեն": []
}

# def add_students():
#     name = input("Mutqagreq anuny:")


#     if name in students:
#         print(f"{name}-y arden ka ")
#     else:
#         students[name] = []
#         print(f"{name} usanoxy arden haytnvec")


# add_students()
# print(students)


# def add_grade():
#     name = input("Mutqagreq anuny:")


#     if name in students:
#         grade = int(input("Mutqagreq gnahatakany:"))


#         if grade >= 0 and grade <= 100:
#             students[name].append(grade)
#             print(f"{grade} avelacvec")
#         else:
#             print("Gnahatakany petq e linin 0-100")
#     else:
#         print("nman anunwv usanwx chi gtnvel")

# add_grade()




# def show_all_students():
#     for name,grade in students.items():

#         if len(grade) > 0:
#             averge = sum(grade) / len(grade)
#             print(f"{name} - {grade} -mijin-{averge:.1f}")
#         else:
#             print(f"{name} - {grade} mijin N/A")

# show_all_students()


# def show_statistic():
#     total_students = len(students)
#     all_averge = []
#     excellent_count = 0
#     no_grade_count = 0 


#     for name, grade in students.items():
#         if len(grade) == 0:
#             no_grade_count += 1
#         else:
#             student_avg = sum(grade) / len(grade)
#             all_averge.append(student_avg)

#             if student_avg > 90:
#                 excellent_count += 1
#     if len(all_averge) > 0:
#         group_averge = sum(all_averge) / len(all_averge)
#         group_averge_display = f"{group_averge:.1f}"

#     else:
#         group_averge_display = "N/A"


#     print(f"yndhanur usanoxneri qanaky {total_students}")
#     print(f"xmbi mijin gnahatakany {group_averge_display}")
#     print(f"gerazancikneri qanaky{excellent_count}")
#     print(f"gnahatakan chunecoxnery {no_grade_count}")


# show_statistic()